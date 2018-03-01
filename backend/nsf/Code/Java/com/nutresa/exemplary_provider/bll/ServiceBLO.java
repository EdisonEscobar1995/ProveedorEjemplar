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
        if (null != service.getName() && !service.getName().trim().isEmpty()) {
            if (existByName(service)) {
                throw new HandlerGenericException("DOCUMENT_EXISTS");
            } else {
                response = super.save(service);
            }
        } else {
            throw new HandlerGenericException("UNEXPECTED_VALUE");
        }

        return response;
    }

    private boolean existByName(ServiceDTO service) throws HandlerGenericException {
        boolean existService = false;
        String name = service.getName().trim();
        String id = service.getId();
        ServiceDAO serviceDAO = new ServiceDAO();
        ServiceDTO serviceExisting = serviceDAO.getByName(name);
        String nameExisting = serviceExisting.getName();
        String idExisting = serviceExisting.getId();

        if ((null == id || id.isEmpty()) && (null != nameExisting && name.equalsIgnoreCase(nameExisting))) {
            existService = true;
        } else {
            if (null != id && null != idExisting && !id.equals(idExisting) && name.equalsIgnoreCase(nameExisting)) {
                existService = true;
            }
        }

        return existService;
    }

}
