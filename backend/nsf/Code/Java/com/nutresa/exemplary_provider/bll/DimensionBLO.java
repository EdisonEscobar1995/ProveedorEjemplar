package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.DimensionDAO;
import com.nutresa.exemplary_provider.dtl.DimensionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class DimensionBLO extends GenericBLO<DimensionDTO, DimensionDAO> {

    public DimensionBLO() {
        super(DimensionDAO.class);
    }

    public List<DimensionDTO> getDimensionsBySurvey(String idSurvey) throws HandlerGenericException {
        DimensionDAO dimensionDAO = new DimensionDAO();
        List<DimensionDTO> responseWithDimensions = new ArrayList<DimensionDTO>();
        List<String> questions = null;
        try {
            QuestionBLO questionBLO = new QuestionBLO();
            questions = questionBLO.getDimensionsInQuestionBySurvery(idSurvey);
            for (String idDimension : questions) {
                responseWithDimensions.add(dimensionDAO.get(idDimension));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return responseWithDimensions;
    }
    
}
