package com.nutresa.exemplary_provider.api;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.bll.SupplierBLO;
import com.nutresa.exemplary_provider.dtl.QuestionsBySurveyDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.queries.InformationFromSupplier;
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
                    .get("idSurvey"), parameters.get("idDimension"), parameters.get("idSupplierByCall")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<QuestionsBySurveyDTO>(exception);
        }

        return response;
    }

    public ServletResponseDTO<SupplierDTO> loadInformation(Map<String, String> parametersInRequest) {
        SupplierBLO supplierBLO = new SupplierBLO();
        ServletResponseDTO<SupplierDTO> response = null;
        try {
            response = new ServletResponseDTO<SupplierDTO>(supplierBLO.getSupplierInSession(parametersInRequest
                    .get("idSupplier")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SupplierDTO>(exception);
        }

        return response;
    }

    public ServletResponseDTO<InformationFromSupplier> getModifiedSuppliers(Map<String, String> parameters) {
        SupplierBLO supplierBLO = new SupplierBLO();
        ServletResponseDTO<InformationFromSupplier> response = null;
        try {
            response = new ServletResponseDTO<InformationFromSupplier>(supplierBLO.getModifiedSuppliers(parameters
                    .get("year")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<InformationFromSupplier>(exception);
        }

        return response;
    }

    public ServletResponseDTO<SupplierDTO> sendInvitation(SupplierDTO supplier) {
        SupplierBLO supplierBLO = new SupplierBLO();
        ServletResponseDTO<SupplierDTO> response = null;
        try {
            response = new ServletResponseDTO<SupplierDTO>(supplierBLO.sendInvitation(supplier));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SupplierDTO>(exception);
        }

        return response;
    }

    public ServletResponseDTO<InformationFromSupplier> getSurveys(Map<String, String> parameters) {
        SupplierBLO supplierBLO = new SupplierBLO();
        ServletResponseDTO<InformationFromSupplier> response = null;
        try {
            response = new ServletResponseDTO<InformationFromSupplier>(supplierBLO.getSummaryWithSurvey(parameters
                    .get("year")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<InformationFromSupplier>(exception);
        }

        return response;
    }

    public ServletResponseDTO<InformationFromSupplier> pendingToQualify(Map<String, String> parameters) {
        SupplierBLO supplierBLO = new SupplierBLO();
        ServletResponseDTO<InformationFromSupplier> response = null;
        try {
            response = new ServletResponseDTO<InformationFromSupplier>(supplierBLO.pendingToQualify(parameters
                    .get("year")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<InformationFromSupplier>(exception);
        }

        return response;
    }

    public ServletResponseDTO<List<SupplierDTO>> searchSupplier(Map<String, String> parametersInReques) {
        SupplierBLO supplierBLO = new SupplierBLO();
        ServletResponseDTO<List<SupplierDTO>> response = null;
        try {
            response = new ServletResponseDTO<List<SupplierDTO>>(supplierBLO.searchSupplier(parametersInReques
                    .get("text")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<SupplierDTO>>(exception);
        }

        return response;
    }

}