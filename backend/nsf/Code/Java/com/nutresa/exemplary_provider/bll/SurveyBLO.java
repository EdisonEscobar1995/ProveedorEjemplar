package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.SurveyDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
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

    @Override
    public SurveyDTO save(SurveyDTO survey) throws HandlerGenericException {
        SurveyDTO response = null;

        if (null != survey.getIdSupply() && null != survey.getIdCompanySize()) {
            if (existSurvey(survey)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(survey);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private boolean existSurvey(SurveyDTO survey) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(survey.getIdSupply());
        filter.add(survey.getIdCompanySize());

        String idItem = survey.getId();
        String temporalIdentifier = survey.getIdSupply().concat(survey.getIdCompanySize());

        SurveyDAO surveyDAO = new SurveyDAO();
        List<SurveyDTO> existingSurvies = surveyDAO.getByProperties(filter);

        if (!existingSurvies.isEmpty()) {
            SurveyDTO existingSurvey = existingSurvies.get(0);

            String idItemExisting = existingSurvey.getId();
            String temporalIdentifierExisting = existingSurvey.getIdSupply().concat(existingSurvey.getIdCompanySize());

            if ((null == idItem || idItem.isEmpty())
                    && (null != temporalIdentifierExisting && temporalIdentifier
                            .equalsIgnoreCase(temporalIdentifierExisting))) {
                existItem = true;
            } else {
                if (null != idItem && null != idItemExisting && !idItem.equals(idItemExisting)
                        && temporalIdentifier.equalsIgnoreCase(temporalIdentifierExisting)) {
                    existItem = true;
                }
            }
        }

        return existItem;
    }

}
