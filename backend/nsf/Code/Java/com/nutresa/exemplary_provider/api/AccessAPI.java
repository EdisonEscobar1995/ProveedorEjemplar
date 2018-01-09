package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.AccessBLO;
import com.nutresa.exemplary_provider.dtl.AccessDTO;

public class AccessAPI extends GenericAPI<AccessDTO, AccessBLO> {
    public AccessAPI() {
        super(AccessDTO.class, AccessBLO.class);
    }
}
