package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.DimensionBLO;
import com.nutresa.exemplary_provider.dtl.DimensionDTO;

public class DimensionAPI extends GenericAPI<DimensionDTO, DimensionBLO> {

    public DimensionAPI() {
        super(DimensionDTO.class, DimensionBLO.class);
    }

}