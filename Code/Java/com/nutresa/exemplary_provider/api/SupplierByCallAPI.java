package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SupplierByCallBLO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;

public class SupplierByCallAPI extends GenericAPI<SupplierByCallDTO, SupplierByCallBLO> {

    public SupplierByCallAPI() {
        super(SupplierByCallDTO.class, SupplierByCallBLO.class);
    }

}