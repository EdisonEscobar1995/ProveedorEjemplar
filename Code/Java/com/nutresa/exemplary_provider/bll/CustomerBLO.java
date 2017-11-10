package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.CustomerDAO;
import com.nutresa.exemplary_provider.dtl.CustomerDTO;

public class CustomerBLO extends GenericBLO<CustomerDTO, CustomerDAO> {

	public CustomerBLO() {
		super(CustomerDAO.class);
	}

}
