package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.CallBLO;
import com.nutresa.exemplary_provider.dtl.CallDTO;

public class CallAPI extends GenericAPI<CallDTO, CallBLO> {

    public CallAPI() {
        super(CallDTO.class, CallBLO.class);
    }

}
