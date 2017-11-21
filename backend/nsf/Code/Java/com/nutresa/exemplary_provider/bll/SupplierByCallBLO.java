package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dal.SupplierByCallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierByCallBLO extends GenericBLO<SupplierByCallDTO, SupplierByCallDAO> {
    public SupplierByCallBLO() {
        super(SupplierByCallDAO.class);
    }

    public SupplierByCallDTO getCurrentCallBySupplier() throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        CallDAO callDAO = new CallDAO();
        CallDTO call = null;
        SupplierByCallDTO response = null;
        SupplierBLO supplierBLO = new SupplierBLO();
        List<SupplierByCallDTO> callsBySupplier = new ArrayList<SupplierByCallDTO>();
        try {
            callsBySupplier = supplierByCallDAO.getBySupplier(supplierBLO.getSupplierInSession().getId());
            for (SupplierByCallDTO supplierByCall : callsBySupplier) {
                call = callDAO.get(supplierByCall.getIdCall());
                if (call.isNotCaduced(new Date())) {
                    response = supplierByCall;
                    break;
                } else {
                    response = null;
                }
            }
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    public void changedCompanySize(String oldIdCompanySize) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        SupplierByCallDTO supplierByCallDTO;
        try {
            supplierByCallDTO = getCurrentCallBySupplier();
            supplierByCallDTO.setOldIdCompanySize(oldIdCompanySize);
            supplierByCallDTO.setLockedByModification(true);
            supplierByCallDAO.save(supplierByCallDTO);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }
}
