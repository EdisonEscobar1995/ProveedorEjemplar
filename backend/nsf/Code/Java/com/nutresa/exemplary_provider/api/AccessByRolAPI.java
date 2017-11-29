package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.AccessByRolBLO;
import com.nutresa.exemplary_provider.dtl.AccessByRolDTO;

public class AccessByRolAPI extends GenericAPI<AccessByRolDTO, AccessByRolBLO> {
    public AccessByRolAPI() {
        super(AccessByRolDTO.class, AccessByRolBLO.class);
    }
}
