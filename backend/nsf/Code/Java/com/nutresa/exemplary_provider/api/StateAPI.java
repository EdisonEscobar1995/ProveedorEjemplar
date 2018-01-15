package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.StateBLO;
import com.nutresa.exemplary_provider.dtl.StateDTO;

public class StateAPI extends GenericAPI<StateDTO, StateBLO> {

    public StateAPI() {
        super(StateDTO.class, StateBLO.class);
    }

}
