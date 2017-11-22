package com.nutresa.exemplary_provider.bll;

import java.util.List;

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

}