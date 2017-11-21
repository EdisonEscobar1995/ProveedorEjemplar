package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.RolByUserBLO;
import com.nutresa.exemplary_provider.dtl.RolByUserDTO;

public class RolByUserAPI extends GenericAPI<RolByUserDTO, RolByUserBLO> {

    public RolByUserAPI() {
        super(RolByUserDTO.class, RolByUserBLO.class);
    }

}