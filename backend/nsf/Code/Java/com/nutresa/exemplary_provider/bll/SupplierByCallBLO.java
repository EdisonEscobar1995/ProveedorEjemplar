package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.SupplierByCallDAO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierByCallBLO extends GenericBLO<SupplierByCallDTO, SupplierByCallDAO> {
    public SupplierByCallBLO() {
        super(SupplierByCallDAO.class);
    }

    public List<SupplierByCallDTO> getCurrentCallBySupplier() throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        SupplierBLO supplierBLO = new SupplierBLO();
        List<SupplierByCallDTO> callsBySupplier = new ArrayList<SupplierByCallDTO>();
        try {
            callsBySupplier = supplierByCallDAO.getBySupplier(supplierBLO.getSupplierInSession().getId());
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return callsBySupplier;
    }
}
