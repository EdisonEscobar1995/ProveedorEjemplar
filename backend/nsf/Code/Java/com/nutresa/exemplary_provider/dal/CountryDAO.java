package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.CountryDTO;

public class CountryDAO extends GenericDAO<CountryDTO> {

    public CountryDAO() {
        super(CountryDTO.class);
        this.entityView = "vwCountries";
    }

}
