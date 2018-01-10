package com.nutresa.exemplary_provider.bll;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SupplierDAO;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
import com.nutresa.exemplary_provider.dtl.CustomerDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.QuestionsBySurveyDTO;
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

        if (null != supplier.getPrincipalCustomer()) {
            CustomerBLO customerBLO = new CustomerBLO();
            for (CustomerDTO customer : supplier.getPrincipalCustomer()) {
                Map<String, String> parameters = new HashMap<String, String>();
                parameters.put("id", customer.getId());
                customerBLO.delete(parameters);
            }
        }

        if (null != supplier.getAttachedFinancialReport()) {
            AttachmentBLO attachmentBLO = new AttachmentBLO();
            for (AttachmentDTO attachment : supplier.getAttachedFinancialReport()) {
                attachmentBLO.delete(attachment.getId());
            }
        }

        if (null != supplier.getDocument()) {
            AttachmentBLO attachmentBLO = new AttachmentBLO();
            for (AttachmentDTO attachment : supplier.getDocument()) {
                attachmentBLO.delete(attachment.getId());
            }
        }

        if (null != dto.getPrincipalCustomer() && !dto.getPrincipalCustomer().isEmpty()) {
            CustomerBLO customerBLO = new CustomerBLO();
            for (CustomerDTO customer : dto.getPrincipalCustomer()) {
                if (null != customer.getName() && !customer.getName().trim().isEmpty()) {
                    customer.setIdSupplier(dto.getId());
                    customerBLO.save(customer);
                }
            }
        }

        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        supplierByCallBLO.participateInCall();
        if (!supplier.getIdCompanySize().equals(dto.getIdCompanySize())) {
            supplierByCallBLO.changedCompanySize(supplier.getIdCompanySize());
            supplier = dao.update(dto.getId(), dto);
            NotificationBLO notificationBLO = new NotificationBLO();
            notificationBLO.notifyChangeCompanySize(dto.getId());
        }

        return dao.update(dto.getId(), dto);
    }

    public SupplierDTO getSupplierInSession() throws HandlerGenericException {
        SupplierDTO response = null;
        SupplierDAO dao = new SupplierDAO();
        response = dao.getSupplierInDirectory();
        response.setDocument(getDocuments(response.getIdDocuments()));
        response.setAttachedFinancialReport(getDocuments(response.getIdAttachedFinancialReport()));
        response.setPrincipalCustomer(getCustomersBySupplier(response.getId()));
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
        CallBLO callBLO = new CallBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        InformationFromSupplier response = new InformationFromSupplier();
        List<Object> listYears;
        
        try {
            listYears = getFieldAll(0, "vwCallsByYear");
            if (null == year || year.isEmpty()) {
                year = (String) listYears.get(0);
            }
            
            List<DTO> supplierByCall = supplierByCallBLO.getAllBy("idCall", callBLO.getIdCallByYear(year),
                    "vwSuppliersByCallModifiedIdCall");
            response = getInformationFromSuppliers(listYears, supplierByCall);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
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
        SupplierDTO supplier = supplierDAO.getSupplierInDirectory();
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
        Map<String, List<Object>> listIds;
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        SupplierDAO supplierDAO = new SupplierDAO();
        
        try {
            listIds = Common.getDtoFields(supplierByCall, new String[] { "[idSupplier]" }, SupplierByCallDTO.class);
            List<SupplierDTO> suppliers = supplierDAO
                    .getAllBy("id", Common.getIdsFromList(listIds.get("[idSupplier]")));
            String[] idFieldNames = { "Category", "Country", "Supply" };
            Map<String, List<Object>> masterIds = Common.getDtoFields(suppliers, idFieldNames, SupplierDTO.class);

            Map<String, List<DTO>> masters = getMasters(idFieldNames, masterIds, true);
            masters.put("CompanySize", companySizeBLO.getAll());
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
        CallBLO callBLO = new CallBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        InformationFromSupplier response = new InformationFromSupplier();
        List<Object> listYears;
        
        try {
            listYears = getFieldAll(0, "vwCallsByYear");
            if (null == year || year.isEmpty()) {
                year = (String) listYears.get(0);
            }
            
            List<DTO> supplierByCall = supplierByCallBLO.getAllBy("idCall", callBLO.getIdCallByYear(year),
                    "vwSuppliersByCallIdCall");
            response = getInformationFromSuppliers(listYears, supplierByCall);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

}
