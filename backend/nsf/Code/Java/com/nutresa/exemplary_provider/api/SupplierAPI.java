package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SupplierBLO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;

public class SupplierAPI extends GenericAPI<SupplierDTO, SupplierBLO> {

    public SupplierAPI() {
        super(SupplierDTO.class, SupplierBLO.class);
    }

    public void getSurvery(SupplierByCallDTO supplierByCall) {
        SupplierBLO supplierBLO = new SupplierBLO();
        supplierBLO.getSurvey(supplierByCall.getIdSurvey());
    }

}