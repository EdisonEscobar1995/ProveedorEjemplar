package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.CriterionDAO;
import com.nutresa.exemplary_provider.dtl.CriterionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CriterionBLO extends GenericBLO<CriterionDTO, CriterionDAO> {

    public CriterionBLO() {
        super(CriterionDAO.class);
    }

    public List<CriterionDTO> getCriterionsBySurvey(String idSurvey, String idDimension) throws HandlerGenericException {
        CriterionDAO dimensionDAO = new CriterionDAO();
        List<CriterionDTO> responseWithCriterions = new ArrayList<CriterionDTO>();
        List<String> questions = null;
        try {
            QuestionBLO questionBLO = new QuestionBLO();
            questions = questionBLO.getCriterionsInQuestionBySurvery(idSurvey, idDimension);
            for (String idCriterions : questions) {
                responseWithCriterions.add(dimensionDAO.get(idCriterions));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return responseWithCriterions;

    }

}
