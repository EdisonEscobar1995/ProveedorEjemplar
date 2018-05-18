package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.ServiceDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ServiceDAO extends GenericDAO<ServiceDTO> {

    public ServiceDAO() {
        super(ServiceDTO.class);
    }

    public ServiceDTO getByName(String name) throws HandlerGenericException {
        ServiceDTO response = null;
        View view = getDatabase().getView("vwServicesByName");
        Document document = view.getFirstDocumentByKey(name, true);
        if (null != document) {
            response = castDocument(document);
        } else {
            response = new ServiceDTO();
        }

        return response;
    }

}
