package com.nutresa.exemplary_provider.bll;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CustomerDAO;
import com.nutresa.exemplary_provider.dtl.CustomerDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CustomerBLO extends GenericBLO<CustomerDTO, CustomerDAO> {

    public CustomerBLO() {
        super(CustomerDAO.class);
    }

    protected List<CustomerDTO> getCustomersBySupplier(String idSupplier) throws HandlerGenericException {
        CustomerDAO customerDAO = new CustomerDAO();
        return customerDAO.getCustomersBySupplier(idSupplier);
    }

    protected void deleteCustomers(List<CustomerDTO> customers) throws HandlerGenericException {
        if (null != customers) {
            for (CustomerDTO customer : customers) {
                Map<String, String> parameters = new HashMap<String, String>();
                parameters.put("id", customer.getId());
                delete(parameters);
            }
        }
    }

}
