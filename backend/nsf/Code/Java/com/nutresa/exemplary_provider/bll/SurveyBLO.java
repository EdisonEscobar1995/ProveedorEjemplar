package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SurveyDAO;
import com.nutresa.exemplary_provider.dtl.SurveyDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SurveyBLO extends GenericBLO<SurveyDTO, SurveyDAO> {

    public SurveyBLO() {
        super(SurveyDAO.class);
    }

    public SurveyDTO getSurvey(String idSupply, String idCompanySize) throws HandlerGenericException {
        SurveyDAO surveyDAO = new SurveyDAO();
        return surveyDAO.getSurvey(idSupply, idCompanySize);
    }

}
