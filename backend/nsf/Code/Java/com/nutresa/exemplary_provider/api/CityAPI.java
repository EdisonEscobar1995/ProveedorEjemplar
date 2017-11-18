package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.CityBLO;
import com.nutresa.exemplary_provider.dtl.CityDTO;

public class CityAPI extends GenericAPI<CityDTO, CityBLO> {

    public CityAPI() {
        super(CityDTO.class, CityBLO.class);
    }

}
