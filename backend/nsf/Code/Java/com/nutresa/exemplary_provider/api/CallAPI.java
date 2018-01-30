package com.nutresa.exemplary_provider.api;

import java.util.Map;
import java.util.List;

import com.nutresa.exemplary_provider.bll.CallBLO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SuppliersInCallDTO;
import com.nutresa.exemplary_provider.dtl.queries.InformationFromSupplier;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfAverageGradeBySuppliers;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CallAPI extends GenericAPI<CallDTO, CallBLO> {

    public CallAPI() {
        super(CallDTO.class, CallBLO.class);
    }

    public ServletResponseDTO<CallDTO> massiveShipmentCall(CallDTO call) {
        ServletResponseDTO<CallDTO> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<CallDTO>(callBLO.massiveShipmentCall(call.getId()));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<CallDTO>(exception);
        }

        return response;
    }

    public ServletResponseDTO<SuppliersInCallDTO> getSuppliersInCall(Map<String, String> parameters) {
        ServletResponseDTO<SuppliersInCallDTO> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<SuppliersInCallDTO>(callBLO.getSuppliersInCall(parameters.get("idCall")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SuppliersInCallDTO>(exception);
        }
        
        return response;
    }

    public ServletResponseDTO<InformationFromSupplier> getParticipantsByYear(Map<String, String> parameters) {
        ServletResponseDTO<InformationFromSupplier> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<InformationFromSupplier>(
                    callBLO.getParticipantsByYear(parameters.get("year")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<InformationFromSupplier>(exception);
        }

        return response;
    }

    public ServletResponseDTO<List<ReportOfAverageGradeBySuppliers>> getResults(Map<String, String> parameters) {
        ServletResponseDTO<List<ReportOfAverageGradeBySuppliers>> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<List<ReportOfAverageGradeBySuppliers>>(
                    callBLO.getResults(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<ReportOfAverageGradeBySuppliers>>(exception);
        }

        return response;
    }

}
