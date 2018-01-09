package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.RolBLO;
import com.nutresa.exemplary_provider.dtl.RolDTO;

public class RolAPI extends GenericAPI<RolDTO, RolBLO> {

    public RolAPI() {
        super(RolDTO.class, RolBLO.class);
    }

}