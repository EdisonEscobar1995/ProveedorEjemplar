package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SupplierByCallBLO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

import java.util.Map;

public class SupplierByCallAPI extends GenericAPI<SupplierByCallDTO, SupplierByCallBLO> {

    public SupplierByCallAPI() {
        super(SupplierByCallDTO.class, SupplierByCallBLO.class);
    }

    public ServletResponseDTO<SupplierByCallDTO> loadCallOfSupplier(Map<String, String> parametersInReques) {
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        ServletResponseDTO<SupplierByCallDTO> response = null;
        try {
            response = new ServletResponseDTO<SupplierByCallDTO>(supplierByCallBLO.getCallOfSupplier(parametersInReques
                    .get("idSupplierByCall")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SupplierByCallDTO>(exception);
        }

        response.setRule(supplierByCallBLO.getRule().getRules());
        return response;
    }

    public ServletResponseDTO<SupplierByCallDTO> finishSurvey(SupplierByCallDTO supplierByCall) {
        ServletResponseDTO<SupplierByCallDTO> response = null;
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        try {
            response = new ServletResponseDTO<SupplierByCallDTO>(supplierByCallBLO.finishSurvey(supplierByCall));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SupplierByCallDTO>(exception);
        }
        return response;
    }

    public ServletResponseDTO<SupplierByCallDTO> unlockSupplier(SupplierByCallDTO supplierByCall) {
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        ServletResponseDTO<SupplierByCallDTO> response = null;
        try {
            response = new ServletResponseDTO<SupplierByCallDTO>(supplierByCallBLO.unlockSupplier(supplierByCall));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SupplierByCallDTO>(exception);
        }

        return response;
    }

    @Override
    public ServletResponseDTO<SupplierByCallDTO> delete(Map<String, String> parameters) {
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        ServletResponseDTO<SupplierByCallDTO> response = null;
        try {
            response = new ServletResponseDTO<SupplierByCallDTO>(supplierByCallBLO.delete(parameters.get("id")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SupplierByCallDTO>(exception);
        }

        return response;
    }

}