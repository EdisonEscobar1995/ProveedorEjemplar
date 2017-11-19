package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.CallBLO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CallAPI extends GenericAPI<CallDTO, CallBLO> {

    public CallAPI() {
        super(CallDTO.class, CallBLO.class);
    }

    public ServletResponseDTO<CallDTO> currentCall() {
        CallBLO call = new CallBLO();
        ServletResponseDTO<CallDTO> response = null;
        try {
            response = new ServletResponseDTO<CallDTO>(call.currentCall());
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<CallDTO>(exception);
        }

        return response;
    }
}
