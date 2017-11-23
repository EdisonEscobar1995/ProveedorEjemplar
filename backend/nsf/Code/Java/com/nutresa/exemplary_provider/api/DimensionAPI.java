package com.nutresa.exemplary_provider.api;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.bll.DimensionBLO;
import com.nutresa.exemplary_provider.dtl.DimensionDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class DimensionAPI extends GenericAPI<DimensionDTO, DimensionBLO> {

    public DimensionAPI() {
        super(DimensionDTO.class, DimensionBLO.class);
    }

    public ServletResponseDTO<List<DimensionDTO>> getDimensionsBySurvey(Map<String, String> parameters) {
        DimensionBLO dimensionBLO = new DimensionBLO();
        ServletResponseDTO<List<DimensionDTO>> response = null;
        try {
            response = new ServletResponseDTO<List<DimensionDTO>>((List<DimensionDTO>) dimensionBLO
                    .getDimensionsBySurvey(parameters.get("idSurvey")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<DimensionDTO>>(exception);
        }

        return response;
    }

}