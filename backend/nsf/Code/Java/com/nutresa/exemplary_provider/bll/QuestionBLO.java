package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.QuestionDAO;
import com.nutresa.exemplary_provider.dtl.AnswerDTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.OptionDTO;
import com.nutresa.exemplary_provider.dtl.QuestionDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.queries.QuestionStatistic;
import com.nutresa.exemplary_provider.dtl.queries.QuestionStatistic.OptionStatistic;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class QuestionBLO extends GenericBLO<QuestionDTO, QuestionDAO> {

    public QuestionBLO() {
        super(QuestionDAO.class);
    }

    @Override
    public QuestionDTO save(QuestionDTO question) throws HandlerGenericException {
        QuestionDTO response = super.save(question);
        cleanOptions(response);
        OptionBLO optionBLO = new OptionBLO();
        optionBLO.createOptions(question.getOptions(), question.getId());
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

    public List<QuestionDTO> getQuestionsBySurvey(String idDimension, String idSupplierByCall)
            throws HandlerGenericException {
        QuestionDAO questionDAO = new QuestionDAO();
        List<QuestionDTO> questions = null;
        try {
            questions = questionDAO.getQuestionsBySurvey(idDimension, idSupplierByCall);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return questions;
    }
    
    public List<QuestionDTO> getByCallDimensionAndCriterion (String idCall, String idDimension, String idCriterion) throws HandlerGenericException {
    	 QuestionDAO questionDAO = new QuestionDAO();
         List<QuestionDTO> questions = null;
         try {
             questions = questionDAO.getByCallDimensionAndCriterion(idCall, idDimension, idCriterion);
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
        QuestionDAO questionDAO = new QuestionDAO();
        QuestionDTO questionDTO;
        for (QuestionDTO question : questions) {
        	questionDTO = questionDAO.associateToCall(question.getId(), question.getIdCall(), idSurvey);
        	if (null != questionDTO){
        		response.add(questionDTO);
        	}
        }

        return response;
    }
    
    public List<QuestionStatistic> getManagerReport(Map<String, String> parameters) throws HandlerGenericException {
    	
    	List<QuestionStatistic> response = new ArrayList<QuestionStatistic>();
    	
    	String idCall = parameters.get("idCall");
	    String idDimension = parameters.get("idDimension");
	    String idCriterion = parameters.get("idCriterion");
	    
	    OptionBLO optionBLO = new OptionBLO();
	    List<OptionDTO> options;
	    
	    SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
	    List<SupplierByCallDTO> suppliersByCall;
	    
	    AnswerBLO answerBLO = new AnswerBLO();
	    AnswerDTO answerDTO;
	    
	    QuestionStatistic questionStatistic;
	    OptionStatistic optionStatistic;
	    List<OptionStatistic> optionsStatistics;
	    Map<String, OptionStatistic> optionsMap;
	    
	    QuestionBLO questionBLO = new QuestionBLO();
	    List<QuestionDTO> questions = questionBLO.getByCallDimensionAndCriterion(idCall, idDimension, idCriterion);
	   
	    for (QuestionDTO questionDTO: questions) {
	    	options = optionBLO.getOptionsByQuestion(questionDTO.getId());
	    	if (options.size() > 0){
	    		questionStatistic = new QuestionStatistic();
	    		optionsMap = new HashMap<String, OptionStatistic>();
	    		
	    		for (OptionDTO optionDTO: options) {
	    			optionStatistic = questionStatistic.new OptionStatistic();
	    			optionStatistic.setId(optionDTO.getId());
	    			optionStatistic.setName(optionDTO.getWording());
	    			optionStatistic.setCount(0);
	    			optionStatistic.setPercent(0);
		    		optionsMap.put(optionDTO.getId(), optionStatistic);
			    }
	    		
	        	for (String idSurvey: questionDTO.getIdSurvey()) {
		    		suppliersByCall = supplierByCallBLO.getByCallAndSurvey(idCall, idSurvey);
		    		for (SupplierByCallDTO supplierByCallDTO: suppliersByCall) {
		    			questionStatistic.setSuppliersCount(questionStatistic.getSuppliersCount() + 1);
		    			answerDTO = answerBLO.getByQuestionAndSupplierByCall(questionDTO.getId(), supplierByCallDTO.getId());
		    			if (null != answerDTO && optionsMap.containsKey(answerDTO.getIdOptionSupplier())){
		    				optionStatistic = optionsMap.get(answerDTO.getIdOptionSupplier());
		    				questionStatistic.setAnswersCount(questionStatistic.getAnswersCount() + 1);
		    				optionStatistic.setCount(optionStatistic.getCount() + 1);
		    			}
	        		}
		    	}
	        	
		    	optionsStatistics = new ArrayList<OptionStatistic>();
	    		for (Map.Entry<String, OptionStatistic> entry : optionsMap.entrySet()) {
		    		optionStatistic = entry.getValue();
		    		optionStatistic.setPercent(Math.round(optionStatistic.getCount() / (questionStatistic.getAnswersCount() == 0.0 ? 1 : questionStatistic.getAnswersCount()) * 100));
		    		optionsStatistics.add(optionStatistic);
		    	}
	    		
	    		questionStatistic.setId(questionDTO.getId());
	    		questionStatistic.setWording(questionDTO.getWording());
	    		questionStatistic.setOptions(optionsStatistics);
	    		
	    		response.add(questionStatistic);
	    	}
	    }
	    return response;
    }

}