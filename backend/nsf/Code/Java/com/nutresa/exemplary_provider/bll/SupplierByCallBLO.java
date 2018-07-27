package com.nutresa.exemplary_provider.bll;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SupplierByCallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SectionRule;
import com.nutresa.exemplary_provider.dtl.StateDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamDTO;
import com.nutresa.exemplary_provider.dtl.SurveyDTO;
import com.nutresa.exemplary_provider.dtl.ManagerTeamAnswerDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.SurveySection;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;
import com.nutresa.exemplary_provider.utils.Common;

public class SupplierByCallBLO extends GenericBLO<SupplierByCallDTO, SupplierByCallDAO> {

    private SectionRule rules;

    public SupplierByCallBLO() {
        super(SupplierByCallDAO.class);
        rules = new SectionRule();
    }

    public SectionRule getRule() {
        return rules;
    }

    /**
     * Obtiene la convocatoria de un proveedor, identificada con
     * <code>idSupplierByCall</code> en caso de <b>NO</b> ser <code>null</code>;
     * en caso de serlo, busca la convocatoria que tenga asiganda y no estÃ©
     * vencida.
     * <p>
     * Si el rol del usuario en sessiÃ³n es <b>LIBERATOR</b> o
     * <b>ADMINISTRATOR</b> se envÃ­a la instrucciÃ³n de modo lectura. Si el rol
     * es <b>EVALUATOR</b> la secciÃ³n de este rol se envÃ­a modo escritura.
     * 
     * @param String
     *            <code>idSupplierByCall</code> Identificador de la convocatoria
     *            asiganda al proveedor
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
                rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(true, true));
                if (userBLO.isRol(Rol.EVALUATOR.toString())) {
                    permissionForEvaluator(response);
                }
            } else {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
            }
        }

        if (isSupplier) {
            response = identifyCallToParticipate(idSupplierByCall, supplier.getId());
        }

        if (!(response instanceof SupplierByCallDTO)) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.DONT_HAVE_SURVEY_ASSOCIED.toString());
        }

        if ((response instanceof SupplierByCallDTO)
                && shouldBeReadOnly(stateBLO.get(response.getIdState()).getShortName())) {
            rules.setRulesToSection(SurveySection.SUPPLIER.getNameSection(), rules.buildRules(true, true));
        }

        return response;
    }

    /**
     * Verifica si la fecha para hacer la encuesta por parte del
     * <b>EVALUATOR</b> estÃ¡ habilitada
     * 
     * @param supplierByCall
     *            Identificador de la convocatoria definitivia de un proveedor
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
                if (supplierByCall.getIdState().equals(
                        stateBLO.getStateByShortName(SurveyStates.DONT_PARTICIPATE.toString()).getId())
                        && supplierByCall.getIdState().equals(
                                stateBLO.getStateByShortName(SurveyStates.NOT_STARTED.toString()).getId())
                        && supplierByCall.getIdState().equals(
                                stateBLO.getStateByShortName(SurveyStates.SUPPLIER.toString()).getId())) {

                    rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(true, true));
                } else {
                    rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(false, true));
                }

                if (supplierByCall.getIdState().equals(
                        stateBLO.getStateByShortName(SurveyStates.EVALUATOR.toString()).getId())
                        || supplierByCall.getIdState().equals(
                                stateBLO.getStateByShortName(SurveyStates.NOT_STARTED_EVALUATOR.toString()).getId())) {
                    rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(true, false));
                }

            }
        } else {
            rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(true, true));
            throw new HandlerGenericException(HandlerGenericExceptionTypes.DATE_TO_MAKE_SURVEY_EVALUATOR_EXCEEDED
                    .toString());
        }
    }

    /**
     * @param idSupplierByCall
     *            Identificador de la convocatoria por proveedor
     * @return
     * @throws HandlerGenericException
     */
    protected boolean isFromEvaluator(String idSupplierByCall) throws HandlerGenericException {
        boolean isFromEvaluator = false;
        SupplierByCallDTO supplierByCall = get(idSupplierByCall);
        UserBLO userBLO = new UserBLO();
        if (null != supplierByCall && !supplierByCall.getWhoEvaluate().isEmpty()
                && !supplierByCall.getWhoEvaluate().equals(userBLO.getNameUserInSession())) {
            isFromEvaluator = true;
        }

        return isFromEvaluator;
    }

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

        if (null != call && call.isCaducedDeadLineToMakeSurvey()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.DATE_TO_MAKE_SURVEY_EXCEEDED.toString());
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
        }

        if (userBLO.isRol(Rol.TECHNICAL_TEAM.toString())) {
            response = finishSurveyOfTechnicalTeam(call, supplierByCall);
        }

        if (userBLO.isRol(Rol.LIBERATOR.toString()) || userBLO.isRol(Rol.ADMINISTRATOR.toString())) {
            response = finishSurveyOfManagerTeam(supplierByCall);
        }

        if (userBLO.isRol(Rol.SUPPLIER.toString())) {
            response = finishSurveyOfSupplier(call, supplierByCall);
        }

        return response;
    }

    private SupplierByCallDTO finishSurveyOfTechnicalTeam(CallDTO call, SupplierByCallDTO supplierByCall)
            throws HandlerGenericException {
        SupplierByCallDTO response = null;

        if (!call.isCaducedDeadLineToMakeSurveyTechnicalTeam()) {
            if (changeState(SurveyStates.ENDED_TECHNICAL_TEAM.toString(), supplierByCall.getId())) {
                response = get(supplierByCall.getId());
                NotificationBLO notificationBLO = new NotificationBLO();
                notificationBLO.notifySurveyCompleted(supplierByCall.getIdSupplier(), Rol.TECHNICAL_TEAM);
            } else {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.THE_SURVEY_COULD_NOT_BE_COMPLETED
                        .toString());
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.DATE_TO_MAKE_SURVEY_TECHNICAL_TEAM_EXCEEDED
                    .toString());
        }

        return response;
    }

    private SupplierByCallDTO finishSurveyOfManagerTeam(SupplierByCallDTO supplierByCall)
            throws HandlerGenericException {
        SupplierByCallDTO response = null;

        if (!changeState(SurveyStates.ENDED_MANAGER_TEAM.toString(), supplierByCall.getId())) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.THE_SURVEY_COULD_NOT_BE_COMPLETED.toString());
        }

        return response;
    }

    /**
     * @param call
     *            Convocatoria
     * @param supplierByCall
     *            Convocatoria del proveedor
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
                notificationBLO.notifySurveyCompleted(supplierByCall.getIdSupplier(), Rol.SUPPLIER);
            } else {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.THE_SURVEY_COULD_NOT_BE_COMPLETED
                        .toString());
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.DATE_TO_MAKE_SURVEY_EXCEEDED.toString());
        }

        return response;
    }

    /**
     * @param call
     *            Convocatoria
     * @param supplierByCall
     *            Convocatoria del proveedor
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
                notificationBLO.notifySurveyCompleted(supplierByCall.getIdSupplier(), Rol.EVALUATOR);
            } else {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.THE_SURVEY_COULD_NOT_BE_COMPLETED
                        .toString());
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.DATE_TO_MAKE_SURVEY_EVALUATOR_EXCEEDED
                    .toString());
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
            Common.logError("Error saving to log ", exception);
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
            currentSupplierByCall.setIdSurvey(surveyBLO.getSurvey(supplier.getIdSupply(), supplier.getIdCompanySize())
                    .getId());
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
        SupplierByCallDTO supplierByCall = supplierByCallDAO
                .getBy(parameters, "vwSuppliersByCallByIdSupplierAndIdCall");
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
        String stateFalse = "false";
        String stateTrue = "true";
        String stateDefault = "";
        if (dto.getParticipateInCall().equals(stateFalse)) {
            dto.setIdState(stateBLO.getStateByShortName(SurveyStates.DONT_PARTICIPATE.toString()).getId());
        }

        if (dto.getParticipateInCall().equals(stateTrue)) {
            dto.setIdState(stateBLO.getStateByShortName(SurveyStates.SUPPLIER.toString()).getId());
        }

        if (dto.getParticipateInCall().equals(stateDefault)) {
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
     * @param idCall
     *            Identificador de la convocatoria.
     * @return ColecciÃ³n de proveedores.
     * @throws HandlerGenericException
     */
    public List<SupplierDTO> getSuppliersByCall(String idCall) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        return supplierByCallDAO.getSuppliersByCall(idCall);
    }

    /**
     * Buscar la convocatoria de un proveedor en caso de estar finalizada
     * 
     * @param idCall
     *            Identificador de la convocatoria
     * @param idSupplier
     *            Identificador del proveedor
     * @return Objeto con la informaciÃ³n en caso de hallar considencia en la
     *         bÃºsqueda.
     * @throws HandlerGenericException
     */
    public SupplierByCallDTO getByIdCallAndIdSupplierFinished(String idCall, String idSupplier,
            List<SurveyStates> surveyStatesAllowed) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        return supplierByCallDAO.getByIdCallAndIdSupplierFinished(idCall, idSupplier, surveyStatesAllowed);
    }

    /**
     * Obtiene las convocatorias por proveedor. Solo aquellas que concidan por
     * cada uno de los estados especificados
     * 
     * @param idCall
     *            Identificador de la convocatoria
     * @param states
     *            ColecciÃ³n con los estados a filtrar.
     * @return ColecciÃ³n de datos encontrados
     * @throws HandlerGenericException
     */
    public List<DTO> getByStates(String idCall, List<String> states) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        List<DTO> response = supplierByCallDAO.getByStates(idCall, states);
        if (response.isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
        }

        return response;
    }

    protected SupplierByCallDTO setWhoEvaluate(String idSupplierByCall, String nameEvaluator)
            throws HandlerGenericException {
        SupplierByCallDTO supplierByCall = get(idSupplierByCall);
        supplierByCall.setWhoEvaluate(nameEvaluator);
        return super.save(supplierByCall);
    }

    protected List<SupplierByCallDTO> getFinishedByStage(SurveyStates stageState) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        StateBLO stateBLO = new StateBLO();
        CallBLO callBLO = new CallBLO();
        List<Object> listYears = getFieldAll(0, "vwCallsByYear");
        String year = (String) listYears.get(0);

        List<SupplierByCallDTO> evaluated = supplierByCallDAO.getByStateInCall(stateBLO.getStateByShortName(
                stageState.toString()).getId(), callBLO.getIdCallByYear(year));

        if (evaluated.isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
        }

        return evaluated;
    }

    protected SupplierByCallDTO update(SupplierByCallDTO supplierByCall) throws HandlerGenericException {
        if (null == supplierByCall.getId() || supplierByCall.getId().trim().isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }
        return super.save(supplierByCall);
    }

    protected boolean isFromTechnicalTeam(String idSupplierByCall) throws HandlerGenericException {
        boolean isFromTechnicalTeamMember = false;
        SupplierByCallDTO supplierByCall = get(idSupplierByCall);
        UserBLO userBLO = new UserBLO();
        if (null != supplierByCall && !supplierByCall.getWhoEvaluateOfTechnicalTeam().isEmpty()
                && !supplierByCall.getWhoEvaluateOfTechnicalTeam().equals(userBLO.getNameUserInSession())) {
            isFromTechnicalTeamMember = true;
        }

        return isFromTechnicalTeamMember;
    }

    protected SupplierByCallDTO setWhoTechnicalTeamMember(String idSupplierByCall, String nameEvaluator)
            throws HandlerGenericException {
        SupplierByCallDTO supplierByCall = get(idSupplierByCall);
        supplierByCall.setWhoEvaluateOfTechnicalTeam(nameEvaluator);
        return super.save(supplierByCall);
    }

    public List<SupplierByCallDTO> getAllByStates(String idCall, List<SurveyStates> states)
            throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        return supplierByCallDAO.getAllByStates(idCall, states);
    }

    /**
     * Verifica que el proveedor <code>idSupplier</code> no exista en la
     * convocatoria <code>idCall</code>
     * 
     * @param idSupplier
     * @param idCall
     * @return <code>true</code> si el proveedor ya se encuentra en la
     *         convocatoria, de lo contrario <code>false</code>
     * @throws HandlerGenericException
     */
    public boolean existSupplierInCall(String idSupplier, String idCall) throws HandlerGenericException {
        boolean existSupplier = false;
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("idSupplier", idSupplier);
        parameters.put("idCall", idCall);
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        SupplierByCallDTO supplierByCall = supplierByCallDAO
                .getBy(parameters, "vwSuppliersByCallByIdSupplierAndIdCall");
        if (supplierByCall instanceof SupplierByCallDTO) {
            existSupplier = true;
        }

        return existSupplier;
    }

    /**
     * Asocia el proveedor a la convocatoria y adicionalmente lo asocica con la
     * encuesta indicada, basandose en en el tipo de ministro y el tamaÃ±o de la
     * empresa.
     * 
     * @param supplier
     * @param idCall
     * @return AsignaciÃ³n de la convocatoria a un proveedor con su respectiva
     *         encuesta.
     * @throws HandlerGenericException
     */
    public SupplierByCallDTO asociateSupplierToCall(SupplierDTO supplier, String idCall) throws HandlerGenericException {
        SurveyBLO surveyBLO = new SurveyBLO();
        SupplierByCallDTO supplierByCall = new SupplierByCallDTO();
        SurveyDTO survey = new SurveyDTO();
        if (null != supplier.getIdCompanySize() && !supplier.getIdCompanySize().isEmpty()) {
            survey = surveyBLO.getSurvey(supplier.getIdSupply(), supplier.getIdCompanySize());
        }

        supplierByCall = getCallActiveToParticipate(supplier.getId());
        if (!(supplierByCall instanceof SupplierByCallDTO)) {
            supplierByCall = new SupplierByCallDTO();
            StateBLO stateBLO = new StateBLO();
            StateDTO state = stateBLO.getStateByShortName(SurveyStates.NOT_STARTED.toString());
            supplierByCall.setIdSupplier(supplier.getId());
            supplierByCall.setIdCall(idCall);
            supplierByCall.setInvitedToCall(false);
            supplierByCall.setIdState(state.getId());
        }

        supplierByCall.setIdSurvey(null == survey.getId() ? null : survey.getId());
        return super.save(supplierByCall);
    }

    /**
     * Elimina todos los documentos donde se utilice el
     * <code>idSupplierByCall</code>
     * 
     * @param idSupplierByCall
     * @return <code>true</code> en caso de eliminar exitosamente los
     *         documentos, de lo contrario <code>false</code>
     * @throws HandlerGenericException
     */
    public SupplierByCallDTO delete(String idSupplierByCall) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        supplierByCallDAO.deleteAllReference(idSupplierByCall);
        return new SupplierByCallDTO();
    }

    /**
     * Verifica si existen proveedores sin haber aceptado su cambio de tamaÃ±o de
     * empresa
     * 
     * @param idCall
     *            Identificador de la convocatoria a consultar
     * @return <code>true</code> si existen proveedores, de lo contrario
     *         <code>false</code>
     * @throws HandlerGenericException
     */
    protected boolean existSuppliersInCompanySizeChanged(String idCall) throws HandlerGenericException {
        SupplierByCallDAO supplierByCallDAO = new SupplierByCallDAO();
        return supplierByCallDAO.existSuppliersInCompanySizeChanged(idCall);
    }

    /**
     * Busca direcciones de correo de los responsables de las evaluaciones en
     * los estados <code>states</code>
     * 
     * @param idCall
     *            Identificador de la convocatoria a consultar
     * @param states
     *            Estados a consultar
     * @return Direcciones de correo electrÃ³nico de los responsables de las
     *         evaluaciones
     * @throws HandlerGenericException
     */
    protected List<String> getResponsibleOfEvaluation(String idCall, List<SurveyStates> states)
            throws HandlerGenericException {
        List<String> responsibles = new ArrayList<String>();
        List<SupplierByCallDTO> suppliersInState = getAllByStates(idCall, states);
        for (SupplierByCallDTO supplierByCall : suppliersInState) {
            switch (states.get(0)) {
            case NOT_STARTED_TECHNICAL_TEAM:
                SupplierBLO supplierBLO = new SupplierBLO();
                SupplierDTO supplier = supplierBLO.get(supplierByCall.getIdSupplier());
                Map<String, String> filter = new LinkedHashMap<String, String>();

                UserBLO userBLO = new UserBLO();
                RolBLO rolBLO = new RolBLO();
                List<UserDTO> userWithTechnicalTeamRol = userBLO.getUsersByRol(rolBLO.getRolByShortName(
                        Rol.TECHNICAL_TEAM.toString()).getId());

                TechnicalTeamBLO technicalTeamBLO = new TechnicalTeamBLO();
                for (UserDTO user : userWithTechnicalTeamRol) {
                    filter.put("USER", user.getId());
                    filter.put("SUPPLY", supplier.getIdSupply());
                    filter.put("CATEGORY", supplier.getIdCategory());
                    filter.put("COUNTRY", supplier.getIdCountry());
                    List<TechnicalTeamDTO> especificTechnicalTeamMembers = technicalTeamBLO
                            .getMembersByEspecificFeactures(filter);

                    responsibles.add((!especificTechnicalTeamMembers.isEmpty() ? user.getEmail() : ""));
                }

                break;
            case TECHNICAL_TEAM:
                responsibles.add(supplierByCall.getWhoEvaluateOfTechnicalTeam());
                break;
            case NOT_STARTED_MANAGER_TEAM:
            case MANAGER_TEAM:
                ManagerTeamAnswerBLO managerTeamAnswerBLO = new ManagerTeamAnswerBLO();
                List<ManagerTeamAnswerDTO> managerTeamAnswer = managerTeamAnswerBLO.getAnswersOfSupplier(supplierByCall
                        .getId());

                for (ManagerTeamAnswerDTO managerAnswer : managerTeamAnswer) {
                    responsibles.add(managerAnswer.getWhoEvaluate());
                }

                break;
            case EVALUATOR:
                responsibles.add(supplierByCall.getWhoEvaluate());
                break;
            default:
                throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
            }
        }
        return responsibles;
    }

    /**
     * Busca los proveedores que se encuentra en los estados <code>states</code>
     * 
     * @param idCall
     *            Identificador de la convocatoria a consultar
     * @param states
     *            Estados a consultar
     * @return Proveedores que se encuentra en los estados <code>states</code>
     * @throws HandlerGenericException
     */
    protected List<SupplierDTO> getSuppliersByCallAndStateEvaluation(String idCall, List<SurveyStates> states)
            throws HandlerGenericException {
        List<SupplierDTO> suppliers = new ArrayList<SupplierDTO>();
        List<SupplierByCallDTO> suppliersByCall = getAllByStates(idCall, states);
        for (SupplierByCallDTO supplierByCall : suppliersByCall) {
            SupplierBLO supplierBLO = new SupplierBLO();
            suppliers.add(supplierBLO.get(supplierByCall.getIdSupplier()));
        }

        return suppliers;
    }

    /**
     * Busca a los proveedores que aÃºn no iniciado el proceso de evaluaciÃ³n y
     * los marca como no participaron
     * 
     * @param idCall
     *            Identifiador de la convocatoria a buscar
     * @throws HandlerGenericException
     */
    protected void markAsNotParticipated(String idCall) throws HandlerGenericException {
        List<SurveyStates> states = new ArrayList<SurveyStates>();
        states.add(SurveyStates.NOT_STARTED);
        List<SupplierByCallDTO> suppliersByCall = getAllByStates(idCall, states);
        for (SupplierByCallDTO supplierByCall : suppliersByCall) {
            supplierByCall.setParticipateInCall("false");
            StateBLO stateBLO = new StateBLO();
            supplierByCall.setIdState(stateBLO.getStateByShortName(SurveyStates.DONT_PARTICIPATE.toString()).getId());
            super.save(supplierByCall);
        }
    }

}
