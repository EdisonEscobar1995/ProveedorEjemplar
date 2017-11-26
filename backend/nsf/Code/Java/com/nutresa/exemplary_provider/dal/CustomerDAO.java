package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.CustomerDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CustomerDAO extends GenericDAO<CustomerDTO> {

    public CustomerDAO() {
        super(CustomerDTO.class);
    }

    public List<CustomerDTO> getCustomersBySupplier(String idSupplier) throws HandlerGenericException {
        List<CustomerDTO> customers = new ArrayList<CustomerDTO>();
        try {
            View currentView = getDatabase().getView("vwCustomersBySupplier");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idSupplier, true);
            for (Document document : documents) {
                customers.add(castDocument(document));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return customers;
    }

}
