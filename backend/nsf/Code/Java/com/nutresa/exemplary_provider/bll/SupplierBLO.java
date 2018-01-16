package com.nutresa.exemplary_provider.bll;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.StateDAO;
import com.nutresa.exemplary_provider.dal.SupplierDAO;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
import com.nutresa.exemplary_provider.dtl.CustomerDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.QuestionsBySurveyDTO;
import com.nutresa.exemplary_provider.dtl.StateDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.queries.InformationFromSupplier;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierBLO extends GenericBLO<SupplierDTO, SupplierDAO> {
    public SupplierBLO() {
        super(SupplierDAO.class);
    }

    @Override
    public SupplierDTO save(SupplierDTO dto) throws HandlerGenericException {
        SupplierDAO dao = new SupplierDAO();
        SupplierDTO supplier = dao.get(dto.getId());
        dto.autoSetIdDocuments();
        dto.autoSetIdAttachedFinancialReport();

        deleteCustomers(getCustomersBySupplier(supplier.getId()));
        deleteDocuments(supplier.getDocument());
        deleteAttachments(supplier.getAttachedFinancialReport());
        savePrincipalCustomers(dto.getPrincipalCustomer(), dto.getId());

        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        supplierByCallBLO.participateInCall();
        if (!supplier.getIdCompanySize().equals(dto.getIdCompanySize())) {
            supplierByCallBLO.changedCompanySize(supplier.getIdCompanySize());
            dao.update(dto.getId(), dto);
            NotificationBLO notificationBLO = new NotificationBLO();
            notificationBLO.notifyChangeCompanySize(dto.getId());
        }

        return dao.update(dto.getId(), dto);
    }

    public SupplierDTO getSupplierInSession(String idSupplier) throws HandlerGenericException {
        SupplierDTO response = null;
        SupplierDAO dao = new SupplierDAO();
        response = dao.getSupplierByFullName(null);

        if (null == response) {
            UserBLO userBLO = new UserBLO();
            if (userBLO.isRol("LIBERATOR") || userBLO.isRol("ADMINISTRATOR")) {
                response = dao.getSupplierByFullName(idSupplier);
            } else {
                throw new HandlerGenericException("ROL_INVALID");
            }
        }

        if (null != response) {
            response.setDocument(getDocuments(response.getIdDocuments()));
            response.setAttachedFinancialReport(getDocuments(response.getIdAttachedFinancialReport()));
            response.setPrincipalCustomer(getCustomersBySupplier(response.getId()));
        }

        return response;
    }

    public QuestionsBySurveyDTO getQuestionsBySurvey(String idSurvey, String idDimension, String idSupplierByCall)
            throws HandlerGenericException {
        QuestionsBySurveyDTO response = new QuestionsBySurveyDTO();
        CriterionBLO criterionBLO = new CriterionBLO();
        QuestionBLO questionsBLO = new QuestionBLO();
        response.setCriterion(criterionBLO.getCriterionsBySurvey(idSurvey, idDimension));
        response.setQuestions(questionsBLO.getQuestionsBySurvey(idSurvey, idDimension, idSupplierByCall));
        return response;
    }

    public InformationFromSupplier getModifiedSuppliers(String year) throws HandlerGenericException {
        String viewName = "vwSuppliersByCallModifiedIdCall";
        return getInformationByYearInView(year, viewName);
    }

    public SupplierDTO update(SupplierDTO supplier) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        return supplierDAO.update(supplier.getId(), supplier);
    }

    private List<AttachmentDTO> getDocuments(List<String> idDocuements) {
        AttachmentBLO attachmentBLO = new AttachmentBLO();
        return attachmentBLO.getDocuments(idDocuements);
    }

    private List<CustomerDTO> getCustomersBySupplier(String idSupplier) throws HandlerGenericException {
        CustomerBLO customerBLO = new CustomerBLO();
        return customerBLO.getCustomersBySupplier(idSupplier);
    }

    public SupplierDTO sendInvitation(SupplierDTO supplier) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        NotificationBLO notification = new NotificationBLO();
        notification.sendInvitation(supplier);
        return supplierDAO.get(supplier.getId());
    }

    public boolean supplierWasInCall() throws HandlerGenericException {
        boolean response = false;
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        SupplierDAO supplierDAO = new SupplierDAO();
        SupplierDTO supplier = supplierDAO.getSupplierByFullName(null);
        if (null != supplier && null != supplierByCallBLO.getBy("idSupplier", supplier.getId())) {
            response = true;
        }
        return response;
    }

    public Map<String, String> getInformationInOtherDataBase(SupplierDTO supplier) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        return supplierDAO.getInformationInOtherDataBase(supplier);
    }

    private InformationFromSupplier getInformationFromSuppliers(List<Object> listYears, List<DTO> supplierByCall)
            throws HandlerGenericException {
        InformationFromSupplier response = new InformationFromSupplier();
        Map<String, List<Object>> listIdsSupplierByCall;
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        SupplierDAO supplierDAO = new SupplierDAO();
        StateDAO stateDAO = new StateDAO();

        try {
            listIdsSupplierByCall = Common.getDtoFields(supplierByCall, new String[] { "[idSupplier]", "[idState]" },
                    SupplierByCallDTO.class);
            List<SupplierDTO> suppliers = supplierDAO.getAllBy("id", Common.getIdsFromList(listIdsSupplierByCall
                    .get("[idSupplier]")));
            List<StateDTO> states = stateDAO.getAllBy("id", Common.getIdsFromList(listIdsSupplierByCall
                    .get("[idState]"), true));

            String[] idFieldNames = { "Category", "Country", "Supply" };
            Map<String, List<Object>> masterIds = Common.getDtoFields(suppliers, idFieldNames, SupplierDTO.class);

            Map<String, List<DTO>> masters = getMasters(idFieldNames, masterIds, true);
            masters.put("CompanySize", companySizeBLO.getAll());
            response.setStates(states);
            response.setMasters(masters);
            response.setSuppliers(suppliers);
            response.setSuppliersByCall(supplierByCall);
            response.setYears(listYears);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
        return response;
    }

    public InformationFromSupplier getSummaryWithSurvey(String year) throws HandlerGenericException {
        String viewName = "vwSuppliersByCallIdCall";
        return getInformationByYearInView(year, viewName);
    }


    public InformationFromSupplier getInformationByYearInView(String year, String viewName)
            throws HandlerGenericException {
        CallBLO callBLO = new CallBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        InformationFromSupplier response = new InformationFromSupplier();
        List<Object> listYears;

        try {
            listYears = getFieldAll(0, "vwCallsByYear");
            if (null == year || year.isEmpty()) {
                year = (String) listYears.get(0);
            }

            List<DTO> supplierByCall = supplierByCallBLO.getAllBy("idCall", callBLO.getIdCallByYear(year), viewName);
            response = getInformationFromSuppliers(listYears, supplierByCall);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    private void deleteCustomers(List<CustomerDTO> customers) throws HandlerGenericException {
        if (null != customers) {
            CustomerBLO customerBLO = new CustomerBLO();
            for (CustomerDTO customer : customers) {
                Map<String, String> parameters = new HashMap<String, String>();
                parameters.put("id", customer.getId());
                customerBLO.delete(parameters);
            }
        }
    }

    private void deleteAttachments(List<AttachmentDTO> attachments) {
        if (null != attachments) {
            AttachmentBLO attachmentBLO = new AttachmentBLO();
            for (AttachmentDTO attachment : attachments) {
                attachmentBLO.delete(attachment.getId());
            }
        }
    }

    private void deleteDocuments(List<AttachmentDTO> documents) {
        if (null != documents) {
            AttachmentBLO attachmentBLO = new AttachmentBLO();
            for (AttachmentDTO attachment : documents) {
                attachmentBLO.delete(attachment.getId());
            }
        }
    }

    private void savePrincipalCustomers(List<CustomerDTO> principalCustomers, String idSupplier)
            throws HandlerGenericException {
        if (null != principalCustomers && !principalCustomers.isEmpty()) {
            CustomerBLO customerBLO = new CustomerBLO();
            for (CustomerDTO customer : principalCustomers) {
                if (null != customer.getName() && !customer.getName().trim().isEmpty()
                        && customer.getPercentageOfParticipationInSales() >= 0) {
                    customer.setIdSupplier(idSupplier);
                    customerBLO.save(customer);
                }
            }
        }
    }

}