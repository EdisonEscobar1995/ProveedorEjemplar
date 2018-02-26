package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.ServiceDAO;
import com.nutresa.exemplary_provider.dtl.ServiceDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ServiceBLO extends GenericBLO<ServiceDTO, ServiceDAO> {

    public ServiceBLO() {
        super(ServiceDAO.class);
    }

    @Override
    public ServiceDTO save(ServiceDTO service) throws HandlerGenericException {
        ServiceDTO response = null;
        if (existByName(service.getName())) {
            throw new HandlerGenericException("DOCUMENT_EXISTS");
        } else {
            response = super.save(service);
        }

        return response;
    }

    private boolean existByName(String name) throws HandlerGenericException {
        boolean existService = false;
        name = name.trim();
        ServiceDAO serviceDAO = new ServiceDAO();
        ServiceDTO service = serviceDAO.getByName(name);

        if (!service.getId().isEmpty() && service.getName().equalsIgnoreCase(name)) {
            existService = true;
        }

        return existService;
    }

}
