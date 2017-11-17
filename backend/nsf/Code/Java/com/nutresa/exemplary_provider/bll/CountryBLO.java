package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.CountryDAO;
import com.nutresa.exemplary_provider.dtl.CountryDTO;

public class CountryBLO extends GenericBLO<CountryDTO, CountryDAO> {

    public CountryBLO() {
        super(CountryDAO.class);
    }

}
