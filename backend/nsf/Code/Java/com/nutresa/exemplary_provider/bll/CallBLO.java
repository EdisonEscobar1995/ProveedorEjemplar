package com.nutresa.exemplary_provider.bll;

import java.util.Date;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CallBLO extends GenericBLO<CallDTO, CallDAO> {

    public CallBLO() {
        super(CallDAO.class);
    }

    public CallDTO currentCall() throws HandlerGenericException {
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        CallDAO callDAO = new CallDAO();
        CallDTO call = null;
        try {
            for (SupplierByCallDTO supplierByCall : supplierByCallBLO.getCurrentCallBySupplier()) {
                call = callDAO.get(supplierByCall.getIdCall());
                if (isNotCaduced(call)) {
                    break;
                } else {
                    call = null;
                }
            }
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return call;
    }

    private boolean isNotCaduced(CallDTO call) {
        Date date = new Date();
        boolean response = false;
        if (date.compareTo(call.getDateToFinishCall()) < 0) {
            response = true;
        }

        return response;
    }

}
