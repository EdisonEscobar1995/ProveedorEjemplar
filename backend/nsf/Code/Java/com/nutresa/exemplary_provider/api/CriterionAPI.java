package com.nutresa.exemplary_provider.api;

import java.util.List;

import com.nutresa.exemplary_provider.bll.CriterionBLO;
import com.nutresa.exemplary_provider.dtl.CriterionDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CriterionAPI extends GenericAPI<CriterionDTO, CriterionBLO> {

    public CriterionAPI() {
        super(CriterionDTO.class, CriterionBLO.class);
    }

    public ServletResponseDTO<List<CriterionDTO>> getCriterionBySurvey(String idSurvey, String idDimension) {
        CriterionBLO criterionBLO = new CriterionBLO();
        ServletResponseDTO<List<CriterionDTO>> response = null;
        try {
            response = new ServletResponseDTO<List<CriterionDTO>>((List<CriterionDTO>) criterionBLO
                    .getCriterionsBySurvey(idSurvey, idDimension));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<CriterionDTO>>(exception);
        }

        return response;
    }

}