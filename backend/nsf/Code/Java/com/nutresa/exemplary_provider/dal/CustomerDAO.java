package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.CustomerDTO;

public class CustomerDAO extends GenericDAO<CustomerDTO> {

    public CustomerDAO() {
        super(CustomerDTO.class);
    }

}
