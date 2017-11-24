package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dal.SupplierByCallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
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
            supplierByCallDAO.update(supplierByCallDTO.getId(), supplierByCallDTO);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

    public SupplierByCallDTO finishSurvey(SupplierByCallDTO supplierByCall) throws HandlerGenericException {
        SupplierByCallDTO response = null;
        supplierByCall.setState("EVALUATOR");
        try {
            response = save(supplierByCall);
            NotificationBLO notificationBLO = new NotificationBLO();
            notificationBLO.notifySurveyCompleted();
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;

    }

    public SupplierByCallDTO unlockSupplier(SupplierByCallDTO supplierByCall) throws HandlerGenericException {
        SupplierByCallDTO response = null;
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        SupplierBLO supplierBLO = new SupplierBLO();
        NotificationBLO notification = new NotificationBLO();
        SupplierDTO supplier = null;
        try {
            SupplierByCallDTO currentSupplierByCall = get(supplierByCall.getId());
            currentSupplierByCall.setLockedByModification(false);
            currentSupplierByCall.setDateLocked(new Date());
            supplier = supplierBLO.get(currentSupplierByCall.getIdSupplier());
            if (!supplierByCall.getOldIdCompanySize().equals(supplier.getIdCompanySize())) {
                currentSupplierByCall.setOldIdCompanySize(supplier.getIdCompanySize());
                supplier.setIdCompanySize(supplierByCall.getOldIdCompanySize());
                supplierBLO.update(supplier);
            }
            response = supplierByCallDAO.update(currentSupplierByCall.getId(), currentSupplierByCall);
            notification.notifyToSupplierForContinue(supplier.getEmail());
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }
}
