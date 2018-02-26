package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.ServiceBLO;
import com.nutresa.exemplary_provider.dtl.ServiceDTO;

public class ServiceAPI extends GenericAPI<ServiceDTO, ServiceBLO> {
    public ServiceAPI() {
        super(ServiceDTO.class, ServiceBLO.class);
    }
}
