package com.nutresa.exemplary_provider.bll;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SupplierDAO;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.CustomerDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.ModifiedSupplierDTO;
import com.nutresa.exemplary_provider.dtl.QuestionsBySurveyDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierBLO extends GenericBLO<SupplierDTO, SupplierDAO> {
    public SupplierBLO() {
        super(SupplierDAO.class);
    }

    @Override
    public SupplierDTO save(SupplierDTO dto) throws HandlerGenericException {
        SupplierDAO dao = new SupplierDAO();
        SupplierDTO supplier = null;
        dto.autoSetIdDocuments();
        dto.autoSetIdAttachedFinancialReport();

        if (null != dto.getPrincipalCustomer() && !dto.getPrincipalCustomer().isEmpty()) {
            CustomerBLO customerBLO = new CustomerBLO();
            for (CustomerDTO customer : dto.getPrincipalCustomer()) {
                customerBLO.save(customer);
            }
        }

        supplier = dao.get(dto.getId());
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        supplierByCallBLO.participateInCall();
        if (!supplier.getIdCompanySize().equals(dto.getIdCompanySize())) {
            supplierByCallBLO.changedCompanySize(supplier.getIdCompanySize());
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

    public QuestionsBySurveyDTO getQuestionsBySurvey(String idSurvey, String idDimension)
            throws HandlerGenericException {
        QuestionsBySurveyDTO response = new QuestionsBySurveyDTO();
        CriterionBLO criterionBLO = new CriterionBLO();
        QuestionBLO questionsBLO = new QuestionBLO();
        response.setCriterion(criterionBLO.getCriterionsBySurvey(idSurvey, idDimension));
        response.setQuestions(questionsBLO.getQuestionsBySurvey(idSurvey, idDimension));
        return response;
    }

    public ModifiedSupplierDTO getModifiedSuppliers(String year) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        CallBLO callBLO = new CallBLO();
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        ModifiedSupplierDTO response = new ModifiedSupplierDTO();
        Map<String, List<Object>> listIds;
        List<Object> listYears;

        // Cargar todos los a�os de las convocatorias
        listYears = callBLO.getFieldAll(0, "vwCallsByYear");
        // Si no llega el a�o cargar el primero para devolver los datos de las
        // las ultimas convocatorias
        if (null == year || year.isEmpty()) {
            year = (String) listYears.get(0);
        }
        // Cargar todas las convocatorias que tengan el a�o enviado o el �ltimo
        List<DTO> listCalls = callBLO.getAllBy("year", year);
        // Extraer los ids de las convocatorias par arealizar el cruce de
        // proveedor x convocatoria
        listIds = Common.getDtoFields(listCalls, new String[] { "[id]" }, CallDTO.class);

        // Consultar los proveedores por convotaria por el id de convocatoria
        // que se encuentren bloqueados o notificados
        List<DTO> supplierByCall = supplierByCallBLO.getAllBy("idCall", Common.getIdsFromList(listIds.get("[id]")),
                "vwSuppliersByCallModifiedIdCall");
        try {
            // Recuperar los ids de los proveedores
            listIds = Common.getDtoFields(supplierByCall, new String[] { "[idSupplier]" }, SupplierByCallDTO.class);
            // Consultar los proveedores que se encuentran bloqueados o
            // notificados para las convocatorias del a�o seleccionado
            List<SupplierDTO> suppliers = supplierDAO
                    .getAllBy("id", Common.getIdsFromList(listIds.get("[idSupplier]")));
            // Realizar el cruce de los maestros seg�n los datos de los
            // proveedores seleccionados
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

}
