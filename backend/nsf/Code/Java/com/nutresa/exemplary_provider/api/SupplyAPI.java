package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SupplyBLO;
import com.nutresa.exemplary_provider.dtl.SupplyDTO;

public class SupplyAPI extends GenericAPI<SupplyDTO, SupplyBLO> {

    public SupplyAPI() {
        super(SupplyDTO.class, SupplyBLO.class);
    }

}