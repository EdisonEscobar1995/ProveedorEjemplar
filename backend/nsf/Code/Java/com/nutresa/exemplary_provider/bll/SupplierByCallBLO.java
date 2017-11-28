package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dal.SupplierByCallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierByCallBLO extends GenericBLO<SupplierByCallDTO, SupplierByCallDAO> {

    private boolean readOnly = false;
    
    
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
                if (call.isNotCaducedDate(call.getDateToFinishCall(), new Date())) {
                    response = supplierByCall;
                    break;
                } else {
                    response = null;
                }
            }
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
        if (null != response && "EVALUATOR".equals(response.getState())) {
            readOnly = true;
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
            supplierByCallDTO.setDateLocked(new Date());
            supplierByCallDAO.update(supplierByCallDTO.getId(), supplierByCallDTO);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

    public SupplierByCallDTO finishSurvey(SupplierByCallDTO supplierByCall) throws HandlerGenericException {
        SupplierByCallDTO response = null;
        supplierByCall.setState("EVALUATOR");
        CallBLO callBLO = new CallBLO();
        CallDTO call = callBLO.get(supplierByCall.getIdCall());
        if (call.isNotCaducedDate(call.getDeadlineToMakeSurvey(), new Date())) {
            response = save(supplierByCall);
            NotificationBLO notificationBLO = new NotificationBLO();
            notificationBLO.notifySurveyCompleted(supplierByCall.getIdSupplier());
            notificationBLO.notifyToContact(supplierByCall.getIdSupplier());
        } else {
            throw new HandlerGenericException("DATE_TO_MAKE_SURVEY_EXCEEDED");
        }

        return response;

    }

    public SupplierByCallDTO unlockSupplier(SupplierByCallDTO supplierByCall) throws HandlerGenericException {
        SupplierByCallDTO response = null;
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        SupplierBLO supplierBLO = new SupplierBLO();
        SurveyBLO surveyBLO = new SurveyBLO();
        NotificationBLO notification = new NotificationBLO();
        AnswerBLO answerBLO = new AnswerBLO();
        SupplierDTO supplier = null;
        try {
            SupplierByCallDTO currentSupplierByCall = get(supplierByCall.getId());
            currentSupplierByCall.setLockedByModification(false);
            currentSupplierByCall.setDateUnLocked(new Date());
            supplier = supplierBLO.get(currentSupplierByCall.getIdSupplier());
            if (!supplierByCall.getOldIdCompanySize().equals(supplier.getIdCompanySize())) {
                currentSupplierByCall.setIdSurvey(surveyBLO.getSurvey(supplier.getIdSupply(),
                        supplier.getIdCompanySize()).getId());
                supplier.setIdCompanySize(supplierByCall.getOldIdCompanySize());
                supplierBLO.update(supplier);
                answerBLO.deleteAnswers(currentSupplierByCall.getId());
            }
            response = supplierByCallDAO.update(currentSupplierByCall.getId(), currentSupplierByCall);
            notification.notifyToSupplierForContinue(supplier.getEmails());
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    public List<SupplierDTO> getSuppliersByCallDontInvited(String idCall) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        return supplierByCallDAO.getSuppliersByCallDontInvited(idCall);
    }

    public void markToInvited(String idSupplier, String idCall) throws HandlerGenericException {
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("idSupplier", idSupplier);
        parameters.put("idCall", idCall);
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        SupplierByCallDTO supplierByCall = supplierByCallDAO
                .getBy(parameters, "vwSuppliersByCallByIdSupplierAndIdCall");
        supplierByCall.setInvitedToCall(true);
        supplierByCallDAO.update(supplierByCall.getId(), supplierByCall);
    }

    public boolean getReadOnly() {
        return readOnly;
    }
}
