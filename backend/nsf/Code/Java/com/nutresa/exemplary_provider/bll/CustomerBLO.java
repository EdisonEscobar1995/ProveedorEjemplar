package com.nutresa.exemplary_provider.bll;

import java.util.List;

import com.nutresa.exemplary_provider.dal.CustomerDAO;
import com.nutresa.exemplary_provider.dtl.CustomerDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CustomerBLO extends GenericBLO<CustomerDTO, CustomerDAO> {

    public CustomerBLO() {
        super(CustomerDAO.class);
    }

    public List<CustomerDTO> getCustomersBySupplier(String idSupplier) throws HandlerGenericException {
        CustomerDAO customerDAO = new CustomerDAO();
        return customerDAO.getCustomersBySupplier(idSupplier);
    }

}
