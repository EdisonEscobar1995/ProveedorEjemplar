package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.AlertDAO;
import com.nutresa.exemplary_provider.dtl.AlertDTO;

public class AlertBLO extends GenericBLO<AlertDTO, AlertDAO> {

    public AlertBLO() {
        super(AlertDAO.class);
    }

}
