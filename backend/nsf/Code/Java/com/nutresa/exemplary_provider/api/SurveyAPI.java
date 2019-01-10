package com.nutresa.exemplary_provider.api;

import java.util.Map;

import com.nutresa.exemplary_provider.bll.SurveyBLO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SurveyDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SurveyAPI extends GenericAPI<SurveyDTO, SurveyBLO> {

    public SurveyAPI() {
        super(SurveyDTO.class, SurveyBLO.class);
    }

    @SuppressWarnings("unchecked")
	public ServletResponseDTO copy(Map<String, String> parameters) {
        ServletResponseDTO response = null;
        SurveyBLO surveyBLO = new SurveyBLO();
        try {
        	surveyBLO.copy(parameters.get("idSurvey"), parameters.get("idCall"));
        	response = new ServletResponseDTO(true);
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO(exception);
        }

        return response;
    }
}