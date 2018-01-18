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

    public SupplierByCallDTO getCurrentCallBySupplier(String idSupplierByCall) throws HandlerGenericException {
        CallDAO callDAO = new CallDAO();
        StateBLO stateBLO = new StateBLO();
        CallDTO call = null;
        SupplierByCallDTO response = null;
        SupplierBLO supplierBLO = new SupplierBLO();
        List<SupplierByCallDTO> callsBySupplier = new ArrayList<SupplierByCallDTO>();
        boolean isSupplier = true;
        try {
            SupplierDTO supplier = supplierBLO.getSupplierInSession(null);

            if (null == supplier) {
                UserBLO userBLO = new UserBLO();
                if (userBLO.isRol("LIBERATOR") || userBLO.isRol("ADMINISTRATOR")) {
                    isSupplier = false;
                    response = get(idSupplierByCall);
                    readOnly = true;
                } else {
                    throw new HandlerGenericException("ROL_INVALID");
                }
            }

            if (isSupplier) {
                callsBySupplier = getCallsBySupplier(supplier.getId());
                for (SupplierByCallDTO supplierByCall : callsBySupplier) {
                    call = callDAO.get(supplierByCall.getIdCall());
                    if (call.isNotCaducedDate(call.getDateToFinishCall(), new Date())) {
                        response = supplierByCall;
                        break;
                    }
                }
            }
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        if (!(response instanceof SupplierByCallDTO)) {
            throw new HandlerGenericException("DONT_HAVE_SURVEY_ASSOCIED");
        }

        if ((response instanceof SupplierByCallDTO)
                && "EVALUATOR".equals(stateBLO.get(response.getIdState()).getShortName())) {
            readOnly = true;
        }

        return response;
    }

    public void changedCompanySize(String oldIdCompanySize) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        SupplierByCallDTO supplierByCallDTO;
        try {
            supplierByCallDTO = getCurrentCallBySupplier(null);
            supplierByCallDTO.setOldIdCompanySize(oldIdCompanySize);
            supplierByCallDTO.setLockedByModification(true);
            supplierByCallDTO.setDateLocked(new Date());
            supplierByCallDAO.update(supplierByCallDTO.getId(), supplierByCallDTO);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    public void participateInCall() throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        SupplierByCallDTO supplierByCall = getCurrentCallBySupplier(null);
        supplierByCall.setParticipateInCall("true");
        supplierByCallDAO.update(supplierByCall.getId(), supplierByCall);
    }

    public SupplierByCallDTO finishSurvey(SupplierByCallDTO supplierByCall) throws HandlerGenericException {
        SupplierByCallDTO response = null;
        CallBLO callBLO = new CallBLO();
        CallDTO call = callBLO.get(supplierByCall.getIdCall());
        if (call.isNotCaducedDate(call.getDeadlineToMakeSurvey(), new Date())) {
            if (changeState("EVALUATOR", supplierByCall.getId())) {
                response = get(supplierByCall.getId());
                NotificationBLO notificationBLO = new NotificationBLO();
                notificationBLO.notifySurveyCompleted(supplierByCall.getIdSupplier());
            } else {
                throw new HandlerGenericException("THE_SURVEY_COULD_NOT_BE_COMPLETED");
            }
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
            if (!supplierByCall.getOldIdCompanySize().equals(currentSupplierByCall.getOldIdCompanySize())) {
                supplier.setIdCompanySize(supplierByCall.getOldIdCompanySize());
                currentSupplierByCall
                        .setIdSurvey(surveyBLO.getSurvey(supplier.getIdSupply(), supplier.getIdCompanySize()).getId());
                notification.notifyToSupplierForContinue(supplier);
                supplierBLO.update(supplier);
                response = supplierByCallDAO.update(currentSupplierByCall.getId(), currentSupplierByCall);
                answerBLO.deleteAnswers(currentSupplierByCall.getId());
            }
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
        SupplierByCallDTO supplierByCall = supplierByCallDAO.getBy(parameters,
                "vwSuppliersByCallByIdSupplierAndIdCall");
        supplierByCall.setInvitedToCall(true);
        supplierByCallDAO.update(supplierByCall.getId(), supplierByCall);
    }

    public boolean getReadOnly() {
        return readOnly;
    }

    public SupplierByCallDTO getSupplierByCallActiveBySupplier(String idSupplier) throws HandlerGenericException {
        SupplierByCallDTO response = null;
        List<SupplierByCallDTO> callsBySupplier = getCallsBySupplier(idSupplier);
        for (SupplierByCallDTO callBySupplier : callsBySupplier) {
            CallBLO callBLO = new CallBLO();
            if (callBLO.get(callBySupplier.getIdCall()).isActive()) {
                response = callBySupplier;
            }
        }

        return response;
    }

    @Override
    public SupplierByCallDTO save(SupplierByCallDTO dto) throws HandlerGenericException {
        StateBLO stateBLO = new StateBLO();
        if (dto.getParticipateInCall().equals("false")) {
            dto.setIdState(stateBLO.getStateByShortName("DONT_PARTICIPATE").getId());
        }

        if (dto.getParticipateInCall().equals("true")) {
            dto.setIdState(stateBLO.getStateByShortName("SUPPLIER").getId());
        }

        if (dto.getParticipateInCall().equals("")) {
            dto.setIdState(stateBLO.getStateByShortName("NOT_STARTED").getId());
        }

        return super.save(dto);
    }

    public boolean changeState(String nameState, String idSupplierByCall) {
        StateBLO stateBLO = new StateBLO();
        boolean response = true;
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        try{
            SupplierByCallDTO supplierByCall = supplierByCallDAO.get(idSupplierByCall);
            supplierByCall.setIdState(stateBLO.getStateByShortName(nameState).getId());
            super.save(supplierByCall);
        } catch(HandlerGenericException exception){
            response = false;
        }

        return response;
    }

    protected List<SupplierByCallDTO> getCallsBySupplier(String idSupplier) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        return supplierByCallDAO.getCallsBySupplier(idSupplier);
    }

}
