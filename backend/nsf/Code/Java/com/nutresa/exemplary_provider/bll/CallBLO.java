package com.nutresa.exemplary_provider.bll;

import java.util.List;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CallBLO extends GenericBLO<CallDTO, CallDAO> {

    public CallBLO() {
        super(CallDAO.class);
    }

    public CallDTO massiveShipmentCall(String idCall) throws HandlerGenericException {
        CallBLO callBLO = new CallBLO();
        CallDTO response = null;
        List<SupplierDTO> suppliers = null;
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        suppliers = supplierByCallBLO.getSuppliersByCall(idCall);
        for (SupplierDTO supplier : suppliers) {
            NotificationBLO notification = new NotificationBLO();
            notification.sendInvitation(supplier.getEmails());
            supplierByCallBLO.markToInvited(supplier.getId(), idCall);
        }

        response = callBLO.get(idCall);
        return response;
    }

}
