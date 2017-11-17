package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;

public class CallBLO extends GenericBLO<CallDTO, CallDAO> {

    public CallBLO() {
        super(CallDAO.class);
    }

}
