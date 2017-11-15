package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SupplierByCallDAO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;

public class SupplierByCallBLO extends
GenericBLO<SupplierByCallDTO, SupplierByCallDAO> {
    public SupplierByCallBLO() {
        super(SupplierByCallDAO.class);
    }
}
