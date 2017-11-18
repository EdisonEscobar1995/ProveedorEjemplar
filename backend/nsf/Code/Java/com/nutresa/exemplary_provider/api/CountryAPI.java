package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.CountryBLO;
import com.nutresa.exemplary_provider.dtl.CountryDTO;

public class CountryAPI extends GenericAPI<CountryDTO, CountryBLO> {

    public CountryAPI() {
        super(CountryDTO.class, CountryBLO.class);
    }

}
