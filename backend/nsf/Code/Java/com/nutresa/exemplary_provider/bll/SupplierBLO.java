package com.nutresa.exemplary_provider.bll;

import java.util.List;

import com.nutresa.exemplary_provider.dal.SupplierDAO;
import com.nutresa.exemplary_provider.dtl.QuestionsBySurveyDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
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
        supplier = dao.get(dto.getId());
        if (!supplier.getIdCompanySize().equals(dto.getIdCompanySize())) {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            supplierByCallBLO.changedCompanySize(supplier.getIdCompanySize());
            NotificationBLO notificationBLO = new NotificationBLO();
            notificationBLO.notifyChangeCompanySize();
        }

        dto = dao.update(dto.getId(), dto);
        if (null != dto.getPrincipalCustomer()) {
            CustomerBLO customer = new CustomerBLO();
            dto
                    .setPrincipalCustomer(customer.saveList(dto.getPrincipalCustomer(), "id" + dao.getEntity(), dto
                            .getId()));
        }

        return dto;
    }

    public SupplierDTO getSupplierInSession() throws HandlerGenericException {
        SupplierDTO response = new SupplierDTO();
        SupplierDAO dao = new SupplierDAO();
        response = dao.getSupplierInDirectory();
        response.setDocument(getDocuments(response.getIdDocuments()));
        response.setAttachedFinancialReport(getDocuments(response.getIdAttachedFinancialReport()));
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

    public SupplierDTO update(SupplierDTO supplier) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        return supplierDAO.update(supplier.getId(), supplier);
    }

    private List<AttachmentDTO> getDocuments(List<String> idDocuements) {
        AttachmentBLO attachmentBLO = new AttachmentBLO();
        return attachmentBLO.getDocuments(idDocuements);
    }
}
