package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SupplierDAO;
import com.nutresa.exemplary_provider.dtl.QuestionsBySurveyDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
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
        try {
            supplier = dao.get(dto.getId());
            if (!supplier.getIdCompanySize().equals(dto.getIdCompanySize())) {
                SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
                supplierByCallBLO.changedCompanySize(supplier.getIdCompanySize());
                NotificationBLO notificationBLO = new NotificationBLO();
                notificationBLO.notifyChangeCompanySize();
            }

            dto = dao.update(dto.getId(),dto);
            if (null != dto.getPrincipalCustomer()) {
                CustomerBLO customer = new CustomerBLO();
                dto.setPrincipalCustomer(customer.saveList(dto.getPrincipalCustomer(), "id" + dao.getEntity(), dto
                        .getId()));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return dto;
    }

    public SupplierDTO getSupplierInSession() throws HandlerGenericException {
        SupplierDTO supplier = null;
        SupplierDAO dao = new SupplierDAO();
        try {
            supplier = dao.getSupplierInDirectory();
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return supplier;
    }

    public QuestionsBySurveyDTO getQuestionsBySurvey(String idSurvey, String idDimension)
            throws HandlerGenericException {
        QuestionsBySurveyDTO response = new QuestionsBySurveyDTO();
        CriterionBLO criterionBLO = new CriterionBLO();
        QuestionBLO questionsBLO = new QuestionBLO();
        try {
            response.setCriterion(criterionBLO.getCriterionsBySurvey(idSurvey, idDimension));
            response.setQuestions(questionsBLO.getQuestionsBySurvey(idSurvey, idDimension));
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
        return response;
    }
}
