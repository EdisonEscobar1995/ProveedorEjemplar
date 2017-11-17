package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SystemBLO;
import com.nutresa.exemplary_provider.dtl.SystemDTO;

public class SystemAPI extends GenericAPI<SystemDTO, SystemBLO> {

    public SystemAPI() {
        super(SystemDTO.class, SystemBLO.class);
    }

}