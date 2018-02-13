package com.nutresa.exemplary_provider.bll;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SupplierByCallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SectionRule;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.SurveySection;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierByCallBLO extends GenericBLO<SupplierByCallDTO, SupplierByCallDAO> {

    private SectionRule rules;

    public SectionRule getRule() {
        return rules;
    }

    public SupplierByCallBLO() {
        super(SupplierByCallDAO.class);
        rules = new SectionRule();
    }

    /**
     * Obtiene la convocatoria de un proveedor, identificada con <code>idSupplierByCall</code> 
     * en caso de <b>NO</b> ser <code>null</code>; en caso de serlo, busca la convocatoria que
     * tenga asiganda y no esté vencida.
     * <p>
     * Si el rol del usuario en sessión es <b>LIBERATOR</b> o <b>ADMINISTRATOR</b> se envía la instrucción de modo
     * lectura. Si el rol es <b>EVALUATOR</b> la sección de este rol se envía modo escritura.
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
            if (userBLO.isRol(Rol.LIBERATOR.toString()) || userBLO.isRol(Rol.ADMINISTRATOR.toString())
                    || userBLO.isRol(Rol.EVALUATOR.toString())) {
                isSupplier = false;
                response = get(idSupplierByCall);
                rules.setRulesToSection(SurveySection.SUPPLIER.getNameSection(), rules.buildRules(true, true));
                if (userBLO.isRol(Rol.EVALUATOR.toString())) {
                    permissionForEvaluator(response);
                } else {
                    rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(false, true));
                }
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
            rules.setRulesToSection(SurveySection.SUPPLIER.getNameSection(), rules.buildRules(true, true));
        }

        return response;
    }

    /**
     * Verifica si la fecha para hacer la encuesta por parte del <b>EVALUATOR</b> está habilitada
     * @param supplierByCall Identificador de la convocatoria definitivia de un proveedor
     * @throws HandlerGenericException
     */
    private void permissionForEvaluator(SupplierByCallDTO supplierByCall) throws HandlerGenericException {
        CallBLO callBLO = new CallBLO();
        CallDTO call = callBLO.get(supplierByCall.getIdCall());
        if (!call.isCaducedDeadLineToMakeSurveyEvaluator()) {
            if (isFromEvaluator(supplierByCall.getId())) {
                rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(true, true));
            } else {
                StateBLO stateBLO = new StateBLO();
                if (supplierByCall.getIdState()
                        .equals(stateBLO.getStateByShortName(SurveyStates.EVALUATOR.toString()).getId())
                        || supplierByCall.getIdState().equals(
                                stateBLO.getStateByShortName(SurveyStates.NOT_STARTED_EVALUATOR.toString()).getId())) {

                    rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(true, false));
                } else {
                    rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(false, true));

                }

                if (supplierByCall.getIdState()
                        .equals(stateBLO.getStateByShortName(SurveyStates.ENDED_EVALUATOR.toString()).getId())) {

                    rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(true, true));
                }
            }
        } else {
            rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(true, true));
            throw new HandlerGenericException("DATE_TO_MAKE_SURVEY_EVALUATOR_EXCEEDED");
        }
    }

    /**
     * Verifica la convocatoria de un proveedor esté siendo evaluada por un <b>EVALUATOR</b>
     * @param idSupplierByCall Identificador definitivo de la convocatoria (convocatoria de un proveedor)
     * @return <code>true</code> si la convocatoria está siendo evaluada o <code>false</code> si aún está libre.
     * @throws HandlerGenericException
     */
    protected boolean isFromEvaluator(String idSupplierByCall) throws HandlerGenericException {
        boolean isFromEvaluator = false;
        SupplierByCallDTO supplierByCall = get(idSupplierByCall);
        UserBLO userBLO = new UserBLO();
        if (null != supplierByCall && !supplierByCall.getWhoEvaluate().isEmpty()
                && !supplierByCall.getWhoEvaluate().equals(userBLO.getUserInSession().getId())) {
            isFromEvaluator = true;
        }

        return isFromEvaluator;
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
                rules.setRulesToSection(SurveySection.SUPPLIER.getNameSection(), rules.buildRules(true, false));
            } else {
                rules.setRulesToSection(SurveySection.SUPPLIER.getNameSection(), rules.buildRules(true, true));
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
                rules.setRulesToSection(SurveySection.SUPPLIER.getNameSection(), rules.buildRules(true, false));
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
        UserBLO userBLO = new UserBLO();
        CallBLO callBLO = new CallBLO();
        CallDTO call = callBLO.get(supplierByCall.getIdCall());

        if (userBLO.isRol(Rol.EVALUATOR.toString())) {
            response = finishSurveyOfEvalutor(call, supplierByCall);
        } else {
            response = finishSurveyOfSupplier(call, supplierByCall);
        }

        return response;
    }

    /**
     * @param call Convocatoria
     * @param supplierByCall Convocatoria del proveedor
     * @return
     * @throws HandlerGenericException
     */
    private SupplierByCallDTO finishSurveyOfSupplier(CallDTO call, SupplierByCallDTO supplierByCall)
            throws HandlerGenericException {
        SupplierByCallDTO response = null;

        if (!call.isCaducedDeadLineToMakeSurvey()) {
            if (changeState(SurveyStates.ENDED_SUPPLIER.toString(), supplierByCall.getId())) {
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

    /**
     * @param call Convocatoria
     * @param supplierByCall Convocatoria del proveedor
     * @return
     * @throws HandlerGenericException
     */
    private SupplierByCallDTO finishSurveyOfEvalutor(CallDTO call, SupplierByCallDTO supplierByCall)
            throws HandlerGenericException {
        SupplierByCallDTO response = null;

        if (!call.isCaducedDeadLineToMakeSurveyEvaluator()) {
            if (changeState(SurveyStates.ENDED_EVALUATOR.toString(), supplierByCall.getId())) {
                response = get(supplierByCall.getId());
                NotificationBLO notificationBLO = new NotificationBLO();
                notificationBLO.notifySurveyCompletedByEvaluator();
            } else {
                throw new HandlerGenericException("THE_SURVEY_COULD_NOT_BE_COMPLETED");
            }
        } else {
            throw new HandlerGenericException("DATE_TO_MAKE_SURVEY_EVALUATOR_EXCEEDED");
        }

        return response;
    }

    public boolean changeState(String nameState, String idSupplierByCall) {
        StateBLO stateBLO = new StateBLO();
        boolean response = true;
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        try {
            SupplierByCallDTO supplierByCall = supplierByCallDAO.get(idSupplierByCall);
            supplierByCall.setIdState(stateBLO.getStateByShortName(nameState).getId());
            super.save(supplierByCall);
        } catch (HandlerGenericException exception) {
            response = false;
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

    /**
     * Obtiene las convocatorias por proveedor. Solo aquellas que concidan por cada uno de los estados especificados
     * @param idCall Identificador de la convocatoria
     * @param states Colección con los estados a filtrar.
     * @return Colección de datos encontrados
     * @throws HandlerGenericException
     */
    public List<DTO> getByStates(String idCall, List<String> states) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        List<DTO> response = supplierByCallDAO.getByStates(idCall, states);
        if (response.isEmpty()) {
            throw new HandlerGenericException("INFORMATION_NOT_FOUND");
        }

        return response;
    }

    protected SupplierByCallDTO setWhoEvaluate(String idSupplierByCall, String nameEvaluator)
            throws HandlerGenericException {
        SupplierByCallDTO supplierByCall = get(idSupplierByCall);
        supplierByCall.setWhoEvaluate(nameEvaluator);
        return super.save(supplierByCall);
    }

}
