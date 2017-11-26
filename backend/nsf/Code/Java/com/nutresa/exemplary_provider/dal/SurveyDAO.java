package com.nutresa.exemplary_provider.dal;

import java.util.HashMap;
import java.util.Map;

import com.nutresa.exemplary_provider.dtl.SurveyDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SurveyDAO extends GenericDAO<SurveyDTO> {

    public SurveyDAO() {
        super(SurveyDTO.class);
    }

    public SurveyDTO getSurvey(String idSupply, String idCompanySize) throws HandlerGenericException {
        SurveyDTO response = null;
        Map<String, String> parameters = new HashMap<String, String>();
        try {
            parameters.put("idSupply", idSupply);
            parameters.put("idCompanySize", idCompanySize);
            response = getBy(parameters, "vwSurveysBySupplyAndCompanySize");
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        if (null == response) {
            throw new HandlerGenericException("SURVEY_DOES_NOT_EXIST");
        }

        return response;
    }

}
