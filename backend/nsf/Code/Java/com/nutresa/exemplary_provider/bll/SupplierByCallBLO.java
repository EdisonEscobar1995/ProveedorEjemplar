package com.nutresa.exemplary_provider.bll;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SupplierByCallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierByCallBLO extends GenericBLO<SupplierByCallDTO, SupplierByCallDAO> {

    private boolean readOnly = false;

    public SupplierByCallBLO() {
        super(SupplierByCallDAO.class);
    }

    /**
     * Obtiene la convocatoria de un proveedor, identificada con <code>idSupplierByCall</code> 
     * en caso de <b>NO</b> ser <code>null</code>; en caso de serlo, busca la convocatoria que
     * tenga asiganda y no esté vencida.
     * 
     * @param String <code>idSupplierByCall</code> Identificador de la convocatoria asiganda al proveedor
     * @return <code>SupplierByCallDTO</code>
     * @throws HandlerGenericException
     */
    public SupplierByCallDTO getCallOfSupplier(String idSupplierByCall) throws HandlerGenericException {
        StateBLO stateBLO = new StateBLO();
        SupplierByCallDTO response = null;
        SupplierBLO supplierBLO = new SupplierBLO();
        boolean isSupplier = true;
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
            response = identifyCallToParticipate(idSupplierByCall, supplier.getId());
        }

        if (!(response instanceof SupplierByCallDTO)) {
            throw new HandlerGenericException("DONT_HAVE_SURVEY_ASSOCIED");
        }

        if ((response instanceof SupplierByCallDTO)
                && shouldBeReadOnly(stateBLO.get(response.getIdState()).getShortName())) {
            readOnly = true;
        }

        return response;
    }

    /**
     * Por medio del estado de la convocatoria identifica si la encuesta se debe mostrar en modo lectura.
     * @param nameCurrentState Nombre del estado en el que se encuentra la convocatoria
     * @return <code>true</code> si el nombre del estado es difente de <code>DONT_PARTICIPATE</code>,
     *         <code>NOT_STARTED</code> y <code>SUPPLIER</code> de lo contrario <code>false</code>
     */
    private boolean shouldBeReadOnly(String nameCurrentState) {
        boolean isReadOnly = false;
        if (!nameCurrentState.equals(SurveyStates.DONT_PARTICIPATE.toString())
                && !nameCurrentState.equals(SurveyStates.NOT_STARTED.toString())
                && !nameCurrentState.equals(SurveyStates.SUPPLIER.toString())) {
            isReadOnly = true;
        }

        return isReadOnly;
    }

    private SupplierByCallDTO identifyCallToParticipate(String idSupplierByCall, String idSupplier)
            throws HandlerGenericException {
        SupplierByCallDTO response = null;
        if (null != idSupplierByCall && !idSupplierByCall.trim().isEmpty()) {
            CallBLO callBLO = new CallBLO();
            response = get(idSupplierByCall);
            if (!callBLO.get(response.getIdCall()).isCaducedDateToFinishCall()) {
                readOnly = false;
            } else {
                readOnly = true;
            }
        } else {
            response = getCallActiveToParticipate(idSupplier);
        }

        return response;
    }

    private SupplierByCallDTO getCallActiveToParticipate(String idSupplier) throws HandlerGenericException {
        CallBLO callBLO = new CallBLO();
        CallDTO call = null;
        SupplierByCallDTO response = null;
        List<SupplierByCallDTO> callsBySupplier = getCallsBySupplier(idSupplier);
        for (SupplierByCallDTO callBySupplier : callsBySupplier) {
            call = callBLO.get(callBySupplier.getIdCall());
            if (!call.isCaducedDateToFinishCall()) {
                response = callBySupplier;
                break;
            }
        }

        return response;
    }

    public void changedCompanySize(String oldIdCompanySize) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        SupplierByCallDTO supplierByCallDTO;
        try {
            supplierByCallDTO = getCallOfSupplier(null);
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
        SupplierByCallDTO supplierByCall = getCallOfSupplier(null);
        supplierByCall.setParticipateInCall("true");
        supplierByCallDAO.update(supplierByCall.getId(), supplierByCall);
    }

    public SupplierByCallDTO finishSurvey(SupplierByCallDTO supplierByCall) throws HandlerGenericException {
        SupplierByCallDTO response = null;
        CallBLO callBLO = new CallBLO();
        CallDTO call = callBLO.get(supplierByCall.getIdCall());
        if (!call.isCaducedDeadLineToMakeSurvey()) {
            if (changeState(SurveyStates.NOT_STARTED_EVALUATOR.toString(), supplierByCall.getId())) {
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
            supplier.setIdCompanySize(supplierByCall.getOldIdCompanySize());
            currentSupplierByCall
                    .setIdSurvey(surveyBLO.getSurvey(supplier.getIdSupply(), supplier.getIdCompanySize()).getId());
            notification.notifyToSupplierForContinue(supplier);
            supplierBLO.update(supplier);
            response = supplierByCallDAO.update(currentSupplierByCall.getId(), currentSupplierByCall);
            if (!supplierByCall.getOldIdCompanySize().equals(currentSupplierByCall.getOldIdCompanySize())) {
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
            dto.setIdState(stateBLO.getStateByShortName(SurveyStates.DONT_PARTICIPATE.toString()).getId());
        }

        if (dto.getParticipateInCall().equals("true")) {
            dto.setIdState(stateBLO.getStateByShortName(SurveyStates.SUPPLIER.toString()).getId());
        }

        if (dto.getParticipateInCall().equals("")) {
            dto.setIdState(stateBLO.getStateByShortName(SurveyStates.NOT_STARTED.toString()).getId());
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

    /**
     * Obtiene los proveedores asociados a una convocatoria.
     * 
     * @param idCall Identificador de la convocatoria.
     * @return Colección de proveedores.
     * @throws HandlerGenericException
     */
    public List<SupplierDTO> getSuppliersByCall(String idCall) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        return supplierByCallDAO.getSuppliersByCall(idCall);
    }

    /**
     * Buscar la convocatoria de un proveedor en caso de estar finalizada
     * 
     * @param idCall Identificador de la convocatoria
     * @param idSupplier Identificador del proveedor
     * @return Objeto con la información en caso de hallar considencia en la búsqueda.
     * @throws HandlerGenericException
     */
    public SupplierByCallDTO getByIdCallAndIdSupplierFinished(String idCall, String idSupplier)
            throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        return supplierByCallDAO.getByIdCallAndIdSupplierFinished(idCall, idSupplier);
    }

}
