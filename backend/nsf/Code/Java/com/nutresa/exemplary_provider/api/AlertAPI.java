package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.AlertBLO;
import com.nutresa.exemplary_provider.dtl.AlertDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AlertAPI extends GenericAPI<AlertDTO, AlertBLO> {
    public AlertAPI() {
        super(AlertDTO.class, AlertBLO.class);
    }

    public ServletResponseDTO<AlertDTO> loadInformation() {
        AlertBLO alertBLO = new AlertBLO();
        ServletResponseDTO<AlertDTO> response = null;
        try {
            response = new ServletResponseDTO<AlertDTO>(alertBLO.executeAlerts());
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<AlertDTO>(exception);
        }

        return response;
    }

}
