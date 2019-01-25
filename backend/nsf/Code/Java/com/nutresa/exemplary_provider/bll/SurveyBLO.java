package com.nutresa.exemplary_provider.bll;

import java.util.List;

import com.nutresa.exemplary_provider.dal.SurveyDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.QuestionDTO;
import com.nutresa.exemplary_provider.dtl.SurveyDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SurveyBLO extends GenericBLO<SurveyDTO, SurveyDAO> {

    public SurveyBLO() {
        super(SurveyDAO.class);
    }

    public SurveyDTO get(String id) throws HandlerGenericException {
    	SurveyDTO surveyDTO = new SurveyDTO();
    	surveyDTO = super.get(id);
    	QuestionBLO questionBLO = new QuestionBLO();
    	List<QuestionDTO> questions = questionBLO.getQuestionsBySurvey(surveyDTO.getId());
     	surveyDTO.setQuestion(questions);
    	return surveyDTO;
    }
    
    public SurveyDTO getSurvey(String idCall, String idSupply, String idCompanySize) throws HandlerGenericException {
        SurveyDAO surveyDAO = new SurveyDAO();
        SurveyDTO surveyDTO = surveyDAO.getSurvey(idCall, idSupply, idCompanySize);
        if (null == surveyDTO) {
            throw new HandlerGenericException("SURVEY_DOES_NOT_EXIST");
        }
        return surveyDTO;
    }

    @Override
    public SurveyDTO save(SurveyDTO survey) throws HandlerGenericException {
        SurveyDTO response = null;
        QuestionBLO questionBLO = new QuestionBLO();
        SurveyDAO surveyDAO = new SurveyDAO();
        if (null != survey.getIdCall() && null != survey.getIdSupply() && null != survey.getIdCompanySize()) {
            if (existSurvey(survey)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else if (surveyDAO.surveyStarted(survey.getId())) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_MULTI_CONNECTED.toString());
            } else {
                response = super.save(survey);
                response.setQuestion(questionBLO.associateToSurvey(survey.getQuestion(), response.getId()));
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private boolean existSurvey(SurveyDTO survey) throws HandlerGenericException {
        SurveyDAO surveyDAO = new SurveyDAO();
        SurveyDTO surveyDTO = surveyDAO.getSurvey(survey.getIdCall(), survey.getIdSupply(), survey.getIdCompanySize());
        
        if (null != surveyDTO && !survey.getId().equals(surveyDTO.getId())) {
        	return true;
        }
        
        return false;
    }
    
    public void copy(String idSurvey, String idCall) throws HandlerGenericException {
    	SurveyDAO surveyDAO = new SurveyDAO();
    	SurveyDTO surveyDTO = surveyDAO.get(idSurvey);
    	SurveyDTO survey = surveyDAO.getSurvey(idCall, surveyDTO.getIdSupply(), surveyDTO.getIdCompanySize());
    	if (null != survey){
    		throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
    	}
    	QuestionBLO questionBLO = new QuestionBLO();
    	List<QuestionDTO> questions = questionBLO.getQuestionsBySurvey(idSurvey);
    	List<String> surveys;
    	for (QuestionDTO question : questions) {
    		surveys = question.getIdSurvey();
    		surveys.remove(idSurvey);
    		question.setIdSurvey(surveys);
        	question.setIdCall(idCall);
        }
       	surveyDTO.setId("");
    	surveyDTO.setIdCall(idCall);
    	surveyDTO.setQuestion(questions);
    	surveyDTO = save(surveyDTO);
    }

}
