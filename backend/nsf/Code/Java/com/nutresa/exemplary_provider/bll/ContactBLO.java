package com.nutresa.exemplary_provider.bll;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.ContactDAO;
import com.nutresa.exemplary_provider.dtl.ContactDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ContactBLO extends GenericBLO<ContactDTO, ContactDAO>{
    public ContactBLO() {
        super(ContactDAO.class);
    }

    protected List<ContactDTO> getContactsBySupplier(String idSupplier) throws HandlerGenericException {
    	ContactDAO ContactDAO = new ContactDAO();
        return ContactDAO.getContactsBySupplier(idSupplier);
    }

    protected void deleteContacts(List<ContactDTO> contacts) throws HandlerGenericException {
        if (null != contacts) {
            for (ContactDTO contact : contacts) {
                Map<String, String> parameters = new HashMap<String, String>();
                parameters.put("id", contact.getId());
                delete(parameters, Boolean.FALSE);
            }
        }
    }
}
