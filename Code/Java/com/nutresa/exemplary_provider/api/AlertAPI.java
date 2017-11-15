package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.AlertBLO;
import com.nutresa.exemplary_provider.dtl.AlertDTO;

public class AlertAPI extends GenericAPI<AlertDTO, AlertBLO> {
    public AlertAPI() {
        super(AlertDTO.class, AlertBLO.class);
    }

}
