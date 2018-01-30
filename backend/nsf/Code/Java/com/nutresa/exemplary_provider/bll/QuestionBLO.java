package com.nutresa.exemplary_provider.bll;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.QuestionDAO;
import com.nutresa.exemplary_provider.dtl.QuestionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class QuestionBLO extends GenericBLO<QuestionDTO, QuestionDAO> {

    public QuestionBLO() {
        super(QuestionDAO.class);
    }

    public List<String> getDimensionsInQuestionBySurvery(String idSurvey) throws HandlerGenericException {
        QuestionDAO questionDAO = new QuestionDAO();
        List<String> dimensionsId = null;
        try {
            dimensionsId = questionDAO.getDimensionsBySurvey(idSurvey);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return dimensionsId;
    }

    public List<String> getCriterionsInQuestionBySurvery(String idSurvey, String idDimension)
            throws HandlerGenericException {
        QuestionDAO questionDAO = new QuestionDAO();
        List<String> criterionsId = null;
        try {
            criterionsId = questionDAO.getCriterionsBySurvey(idSurvey, idDimension);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return criterionsId;
    }

    public List<QuestionDTO> getQuestionsBySurvey(String idSurvey, String idDimension, String idSupplierByCall)
            throws HandlerGenericException {
        QuestionDAO questionDAO = new QuestionDAO();
        List<QuestionDTO> questions = null;
        try {
            questions = questionDAO.getQuestionsBySurvey(idSurvey, idDimension, idSupplierByCall);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return questions;
    }

    protected List<QuestionDTO> getByFields(Map<String, String> fieldsToFilter) throws HandlerGenericException {
        QuestionDAO questionDAO = new QuestionDAO();
        List<QuestionDTO> response = null;
        try {
            response = questionDAO.getThemFilters(fieldsToFilter);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        if(null == response){
            throw new HandlerGenericException("INFORMATION_NOT_FOUND");
        }

        return response;
    }

}