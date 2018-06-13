package com.nutresa.exemplary_provider.api;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.bll.QuestionBLO;
import com.nutresa.exemplary_provider.dtl.QuestionDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class QuestionAPI extends GenericAPI<QuestionDTO, QuestionBLO> {

    public QuestionAPI() {
        super(QuestionDTO.class, QuestionBLO.class);
    }

    public ServletResponseDTO<List<QuestionDTO>> getByDimensionAndCriterion(Map<String, String> parameters) {
        ServletResponseDTO<List<QuestionDTO>> response = null;
        QuestionBLO systemBLO = new QuestionBLO();
        try {
            response = new ServletResponseDTO<List<QuestionDTO>>(systemBLO.getByDimensionAndCriterion(parameters
                    .get("idDimension"), parameters.get("idCriterion")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<QuestionDTO>>(exception);
        }

        return response;
    }

}