package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SectorBLO;
import com.nutresa.exemplary_provider.dtl.SectorDTO;

public class SectorAPI extends GenericAPI<SectorDTO, SectorBLO> {

    public SectorAPI() {
        super(SectorDTO.class, SectorBLO.class);
    }

}