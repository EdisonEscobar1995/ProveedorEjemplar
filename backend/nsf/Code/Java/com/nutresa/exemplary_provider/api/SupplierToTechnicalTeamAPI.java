package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SupplierToTechnicalTeamBLO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SupplierToTechnicalTeamDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierToTechnicalTeamAPI extends GenericAPI<SupplierToTechnicalTeamDTO, SupplierToTechnicalTeamBLO> {

    public SupplierToTechnicalTeamAPI() {
        super(SupplierToTechnicalTeamDTO.class, SupplierToTechnicalTeamBLO.class);
    }

    public ServletResponseDTO<String> approveToTechnicalTeam(SupplierToTechnicalTeamDTO parameters) {
        SupplierToTechnicalTeamBLO supplierToTechnicalTeamBLO = new SupplierToTechnicalTeamBLO();
        ServletResponseDTO<String> response = null;
        try {
            response = new ServletResponseDTO<String>(supplierToTechnicalTeamBLO.approveToTechnicalTeam(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<String>(exception);
        }

        return response;
    }

    public ServletResponseDTO<String> dontApproveToTechnicalTeam(SupplierToTechnicalTeamDTO parameters) {
        SupplierToTechnicalTeamBLO supplierToTechnicalTeamBLO = new SupplierToTechnicalTeamBLO();
        ServletResponseDTO<String> response = null;
        try {
            response = new ServletResponseDTO<String>(
                    supplierToTechnicalTeamBLO.dontApproveToTechnicalTeam(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<String>(exception);
        }

        return response;
    }

    public ServletResponseDTO<String> finishTechnicalTeamSurvey(SupplierToTechnicalTeamDTO parameters) {
        SupplierToTechnicalTeamBLO supplierToTechnicalTeamBLO = new SupplierToTechnicalTeamBLO();
        ServletResponseDTO<String> response = null;
        try {
            response = new ServletResponseDTO<String>(supplierToTechnicalTeamBLO.finishTechnicalTeamSurvey(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<String>(exception);
        }

        return response;
    }

}