package com.nutresa.exemplary_provider.api;

import java.util.Map;

import com.nutresa.exemplary_provider.bll.SupplierBLO;
import com.nutresa.exemplary_provider.dtl.QuestionsBySurveyDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierAPI extends GenericAPI<SupplierDTO, SupplierBLO> {

    public SupplierAPI() {
        super(SupplierDTO.class, SupplierBLO.class);
    }

    public ServletResponseDTO<QuestionsBySurveyDTO> getQuestionsBySurvey(Map<String, String> parameters) {
        SupplierBLO supplierBLO = new SupplierBLO();
        ServletResponseDTO<QuestionsBySurveyDTO> response = null;
        try {
            response = new ServletResponseDTO<QuestionsBySurveyDTO>(supplierBLO.getQuestionsBySurvey(parameters
                    .get("idSurvey"), parameters.get("idDimension")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<QuestionsBySurveyDTO>(exception);
        }

        return response;
    }

}