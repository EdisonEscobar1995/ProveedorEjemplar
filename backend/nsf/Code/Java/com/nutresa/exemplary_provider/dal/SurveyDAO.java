package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.SurveyDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SurveyDAO extends GenericDAO<SurveyDTO> {

    public SurveyDAO() {
        super(SurveyDTO.class);
    }

    public SurveyDTO getSurvey(String idCall, String idSupply, String idCompanySize) throws HandlerGenericException {
        SurveyDTO response = null;
        Map<String, String> parameters = new HashMap<String, String>();
        try {
        	parameters.put("idCall", idCall);
            parameters.put("idSupply", idSupply);
            parameters.put("idCompanySize", idCompanySize);
            response = getBy(parameters, "vwSurveysByCallSupplyAndCompanySize");
            if (null == response) {
                throw new HandlerGenericException("SURVEY_DOES_NOT_EXIST");
            }

            return response;
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

    public List<SurveyDTO> getByProperties(List<String> filter) throws HandlerGenericException {
        List<SurveyDTO> survey = new ArrayList<SurveyDTO>();
        View currentView = getDatabase().getView("vwSurveysByCallSupplyAndCompanySize");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            for (Document document : documents) {
                survey.add(castDocument(document));
            }
        }

        return survey;
    }

}
