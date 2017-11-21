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
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SupplierByCallDTO>(exception);
        }

        return response;
    }

    public ServletResponseDTO<SupplierByCallDTO> dontParticipateInProgram(SupplierByCallDTO supplierByCall) {
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        ServletResponseDTO<SupplierByCallDTO> response = null;
        try {
            response = new ServletResponseDTO<SupplierByCallDTO>(supplierByCallBLO.save(supplierByCall));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SupplierByCallDTO>(exception);
        }

        return response;
    }

}