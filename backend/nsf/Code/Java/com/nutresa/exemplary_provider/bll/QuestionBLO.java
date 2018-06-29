package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.QuestionDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.OptionDTO;
import com.nutresa.exemplary_provider.dtl.QuestionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class QuestionBLO extends GenericBLO<QuestionDTO, QuestionDAO> {

    public QuestionBLO() {
        super(QuestionDAO.class);
    }

    @Override
    public QuestionDTO save(QuestionDTO dto) throws HandlerGenericException {
        QuestionDTO response = super.save(dto);
        cleanOptions(response);
        return response;
    }

    private void cleanOptions(QuestionDTO question) throws HandlerGenericException {
        OptionBLO optionBLO = new OptionBLO();
        List<OptionDTO> options = optionBLO.getOptionsByQuestion(question.getId());
        for (OptionDTO option : options) {
            boolean existQuestion = false;
            List<OptionDTO> optionsInQuestion = question.getOptions();
            for (OptionDTO optionInQuestion : optionsInQuestion) {
                if (optionInQuestion.getId().equals(option.getId())) {
                    existQuestion = true;
                    break;
                }
            }

            if (!existQuestion) {
                Map<String, String> parameters = new HashMap<String, String>();
                parameters.put("id", option.getId());
                optionBLO.delete(parameters, true);
            }
        }
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

    /**
     * Filtra las preguntas según los campos especificados en
     * <code>fieldsToFilter</code>
     * 
     * @param fieldsToFilter
     *            Mapa clave valor de los campos por los cuales se filtrarán las
     *            preguntas
     * @return Colección de preguntas
     * @throws HandlerGenericException
     */
    protected List<QuestionDTO> getThemWithFilter(Map<String, String> fieldsToFilter) throws HandlerGenericException {
        QuestionDAO questionDAO = new QuestionDAO();
        List<QuestionDTO> response = null;
        try {
            response = questionDAO.getThemWithFilter(fieldsToFilter);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        if (null == response) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
        }

        return response;
    }

    protected static Map<String, List<String>> getEntityWithFieldsToTranslate() {
        Map<String, List<String>> entityWithFields = new HashMap<String, List<String>>();
        List<String> fields = new ArrayList<String>();
        fields.add("wording");
        fields.add("helpText");
        entityWithFields.put("Question", fields);
        return entityWithFields;
    }

    protected List<QuestionDTO> associateToSurvey(List<QuestionDTO> questions, String idSurvey)
            throws HandlerGenericException {
        List<QuestionDTO> response = new ArrayList<QuestionDTO>();
        for (QuestionDTO question : questions) {
            List<String> idSurveysInQuestion = question.getIdSurvey();
            idSurveysInQuestion.add(idSurvey);
            question.setIdSurvey(idSurveysInQuestion);
            response.add(super.save(question));
        }

        return response;
    }

}