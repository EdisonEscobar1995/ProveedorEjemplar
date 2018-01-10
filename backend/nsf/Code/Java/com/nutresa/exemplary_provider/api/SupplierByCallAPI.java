package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SupplierByCallBLO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierByCallAPI extends GenericAPI<SupplierByCallDTO, SupplierByCallBLO> {

    public SupplierByCallAPI() {
        super(SupplierByCallDTO.class, SupplierByCallBLO.class);
    }

    public ServletResponseDTO<SupplierByCallDTO> currentCall() {
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        ServletResponseDTO<SupplierByCallDTO> response = null;
        try {
            response = new ServletResponseDTO<SupplierByCallDTO>(supplierByCallBLO.getCurrentCallBySupplier());
            response.addRule("readOnly", supplierByCallBLO.getReadOnly());
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SupplierByCallDTO>(exception);
        }

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

}