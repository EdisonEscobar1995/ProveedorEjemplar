package com.nutresa.exemplary_provider.api;

import java.util.Map;

import com.nutresa.exemplary_provider.bll.SupplierToNextStageBLO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SupplierToNextStageDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierToNextStageAPI extends GenericAPI<SupplierToNextStageDTO, SupplierToNextStageBLO> {

    public SupplierToNextStageAPI() {
        super(SupplierToNextStageDTO.class, SupplierToNextStageBLO.class);
    }

    public ServletResponseDTO<String> approveToNextStage(SupplierToNextStageDTO parameters) {
        SupplierToNextStageBLO supplierToTechnicalTeamBLO = new SupplierToNextStageBLO();
        ServletResponseDTO<String> response = null;
        try {
           	response = new ServletResponseDTO<String>(supplierToTechnicalTeamBLO.approveToNextStage(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<String>(exception);
        }

        return response;
    }

    public ServletResponseDTO<String> dontApproveToNextStage(SupplierToNextStageDTO parameters) {
        SupplierToNextStageBLO supplierToTechnicalTeamBLO = new SupplierToNextStageBLO();
        ServletResponseDTO<String> response = null;
        try {
            response = new ServletResponseDTO<String>(supplierToTechnicalTeamBLO.dontApproveToNextStage(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<String>(exception);
        }

        return response;
    }

    public ServletResponseDTO<String> finishSurveyMassive(SupplierToNextStageDTO parameters) {
        SupplierToNextStageBLO supplierToTechnicalTeamBLO = new SupplierToNextStageBLO();
        ServletResponseDTO<String> response = null;
        try {
            response = new ServletResponseDTO<String>(supplierToTechnicalTeamBLO.finishSurveyMassive(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<String>(exception);
        }

        return response;
    }

    public ServletResponseDTO<String> finishSurveyManagerTeam(Map<String, String> parameters) {
        SupplierToNextStageBLO supplierToTechnicalTeamBLO = new SupplierToNextStageBLO();
        ServletResponseDTO<String> response = null;
        try {
            response = new ServletResponseDTO<String>(supplierToTechnicalTeamBLO.finishSurveyManagerTeam(parameters
                    .get("year")));
            response.setNotice(supplierToTechnicalTeamBLO.getNotice());
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<String>(exception);
        }

        return response;
    }

}