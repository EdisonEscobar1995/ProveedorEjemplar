package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.CustomerBLO;
import com.nutresa.exemplary_provider.dtl.CustomerDTO;

public class CustomerAPI extends GenericAPI<CustomerDTO, CustomerBLO> {

    public CustomerAPI() {
        super(CustomerDTO.class, CustomerBLO.class);
    }

}