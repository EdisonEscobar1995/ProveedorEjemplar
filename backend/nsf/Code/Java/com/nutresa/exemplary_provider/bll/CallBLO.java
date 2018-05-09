package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Iterator;
import java.util.LinkedHashMap;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.ManagerTeamDTO;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SupplyDTO;
import com.nutresa.exemplary_provider.dtl.CompanySizeDTO;
import com.nutresa.exemplary_provider.dtl.CountryDTO;
import com.nutresa.exemplary_provider.dtl.SectionRule;
import com.nutresa.exemplary_provider.dtl.SurveySection;
import com.nutresa.exemplary_provider.dtl.StagesCall;
import com.nutresa.exemplary_provider.dtl.NotificationType;
import com.nutresa.exemplary_provider.dtl.SuppliersInCallDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.queries.InformationFromSupplier;
import com.nutresa.exemplary_provider.dtl.queries.SummaryToLoadSupplier;
import com.nutresa.exemplary_provider.dtl.queries.StatisticalProgress;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfCalificationsBySuppliers;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CallBLO extends GenericBLO<CallDTO, CallDAO> {
    private SectionRule rules;
    private static final String VIEW_CALL_BY_YEAR = "vwCallsByYear";

    public CallBLO() {
        super(CallDAO.class);
    }

    public SectionRule getRule() {
        return rules;
    }

    @Override
    public CallDTO save(CallDTO call) throws HandlerGenericException {
        CallDTO existingCall = null;
        CallDTO callActive = getCallActive();
        String idCallExisting = getIdCallByYear(String.valueOf(call.getYear()));
        if (null != idCallExisting && !idCallExisting.isEmpty()) {
            existingCall = get(idCallExisting);
        }

        if ((callActive instanceof CallDTO) && call.getYear() != callActive.getYear()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.ALREADY_EXIST_CALL_ACTIVE.toString());
        }

        if ((existingCall instanceof CallDTO) && !existingCall.getId().equals(call.getId())) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.ALREADY_EXIST_CALL.toString());
        }

        if (!call.isCaducedDateToFinishCall()) {
            call.setActive(true);
        } else {
            call.setActive(false);
        }

        callActive = super.save(call);

        return callActive;
    }

    /**
     * Busca la convocatoria que esté activa
     * 
     * @return Convocatoria activa
     * @throws HandlerGenericException
     */
    protected CallDTO getCallActive() throws HandlerGenericException {
        CallDAO callDAO = new CallDAO();
        return callDAO.getCallActive();
    }

    public CallDTO massiveShipmentCall(String idCall) throws HandlerGenericException {
        CallBLO callBLO = new CallBLO();
        CallDTO response = null;
        List<SupplierDTO> suppliers = null;
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        suppliers = supplierByCallBLO.getSuppliersByCallDontInvited(idCall);
        for (SupplierDTO supplier : suppliers) {
            NotificationBLO notification = new NotificationBLO();
            notification.sendNotificationTypeToSupplier(supplier, NotificationType.SUPPLIER_CALLED_BY_LIBERATOR);
            supplierByCallBLO.markToInvited(supplier.getId(), idCall);
        }

        response = callBLO.get(idCall);
        return response;
    }

    public SuppliersInCallDTO getSuppliersInCall(String idCall) throws HandlerGenericException {
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        SuppliersInCallDTO response = new SuppliersInCallDTO();
        Map<String, List<Object>> listIds;
        SupplierBLO supplierBLO = new SupplierBLO();
        List<DTO> supplierByCall = supplierByCallBLO.getAllBy(FieldToFilter.FIELD_CALL, idCall,
                "vwSuppliersByCallIdCall");
        try {
            listIds = Common.getDtoFields(supplierByCall, new String[] { "[idSupplier]" }, SupplierByCallDTO.class);
            // Consultar los proveedores que se encuentran bloqueados o
            // notificados para las convocatorias del año seleccionado
            List<DTO> suppliers = supplierBLO.getAllBy("id", Common.getIdsFromList(listIds.get("[idSupplier]")));
            // Realizar el cruce de los maestros según los datos de los
            // proveedores seleccionados
            String[] idFieldNames = { "CompanySize", "Supply", "Country" };
            Map<String, List<Object>> masterIds = Common.getDtoFields(suppliers, idFieldNames, SupplierDTO.class);

            Map<String, List<DTO>> masters = getMasters(idFieldNames, masterIds, true);
            response.setMasters(masters);
            response.setSuppliers(suppliers);
            response.setSuppliersByCall(supplierByCall);

        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
        return response;
    }

    protected String getIdCallByYear(String year) throws HandlerGenericException {
        Map<String, List<Object>> listIds;
        List<DTO> listCalls = getAllBy("year", year);
        listIds = Common.getDtoFields(listCalls, new String[] { "[id]" }, CallDTO.class);
        return Common.getIdsFromList(listIds.get("[id]"));
    }

    public InformationFromSupplier getParticipantsByYear(String year) throws HandlerGenericException {
        List<Object> listYears = getFieldAll(0, VIEW_CALL_BY_YEAR);
        if (null == year || year.trim().isEmpty()) {
            year = (String) listYears.get(0);
        }

        SupplierBLO supplierBLO = new SupplierBLO();
        InformationFromSupplier response = null;
        SupplierDTO supplier = supplierBLO.getSupplierInSession(null);
        if (null == supplier) {
            UserBLO userBLO = new UserBLO();
            if (userBLO.isRol(Rol.LIBERATOR.toString()) || userBLO.isRol(Rol.ADMINISTRATOR.toString())) {
                response = supplierBLO.getSummaryWithSurvey(year);
            } else {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
            }
        } else {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            Map<String, String> filter = new HashMap<String, String>();
            filter.put(FieldToFilter.FIELD_SUPPLIER, supplier.getId());
            filter.put(FieldToFilter.FIELD_CALL, getIdCallByYear(year));
            List<DTO> callsBySupplier = supplierByCallBLO.getAllBy(filter, "vwSuppliersByCallInIdSupplierAndIdCall");
            response = supplierBLO.getInformationFromSuppliers(listYears, callsBySupplier);
        }

        return response;
    }

    /**
     * @param parameters Mapa clave valor de los filtros por los que se van a
     *                   optener los resultados
     * @return Collección de datos obtenidos según los parámetros
     *         <code>parameters</code>
     * @throws HandlerGenericException Con mensaje <code>CALL_NOT_ESPECIFIED</code>
     *                                 si no se envía el identificador de la
     *                                 convocatoria en los parámetros de búsqueda.
     *                                 on mensaje code>INFORMATION_NOT_FOUND</code>
     *                                 si no se encontró información para e p
     *                                 rtar. Con m nsaje <code>ROL_INVALID</code> si
     *                                 el usuario en sesión no tiene el rol 
     *                                 rmitido.
     */
    public List<ReportOfCalificationsBySuppliers> getReportOfAverageGradeBySupplier(Map<String, String> parameters)
            throws HandlerGenericException {
        List<ReportOfCalificationsBySuppliers> response = null;

        UserBLO userBLO = new UserBLO();
        if (userBLO.isRol(Rol.LIBERATOR.toString()) || userBLO.isRol(Rol.ADMINISTRATOR.toString())
                || userBLO.isRol(Rol.EVALUATOR.toString())) {
            String idCall = parameters.get("call");
            SupplierBLO supplierBLO = new SupplierBLO();
            List<SupplierDTO> suppliers = supplierBLO.getThemByIdCallOrFiltered(idCall, parameters);
            response = buildReportOfAverageGradeBySupplier(idCall, suppliers, parameters);
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
        }

        if (response.isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
        }

        return response;
    }

    /**
     * @param idCall     Identificador de la convocatoria que se va consultar.
     * @param suppliers  Collección de proveedores
     * @param parameters Mapa clave valor de los filtros por los que se van a
     *                   optener los resultados
     * @return Collección de registros del reporte
     * @throws HandlerGenericException
     */
    private List<ReportOfCalificationsBySuppliers> buildReportOfAverageGradeBySupplier(String idCall,
            List<SupplierDTO> suppliers, Map<String, String> parameters) throws HandlerGenericException {
        List<ReportOfCalificationsBySuppliers> response = new ArrayList<ReportOfCalificationsBySuppliers>();
        StateBLO stateBLO = new StateBLO();
        String typeReport = parameters.get("type");
        if (null != typeReport) {
            List<SurveyStates> surveyStatesAllowed = stateBLO.getStatesByTypeReport(typeReport);
            for (SupplierDTO supplier : suppliers) {
                SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
                SupplierByCallDTO supplierByCall = supplierByCallBLO.getByIdCallAndIdSupplierFinished(idCall,
                        supplier.getId(), surveyStatesAllowed);

                if (supplierByCall instanceof SupplierByCallDTO) {
                    response.add(getRecordOfReport(supplierByCall, supplier, parameters));
                }
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private ReportOfCalificationsBySuppliers getRecordOfReport(SupplierByCallDTO supplierByCall, SupplierDTO supplier,
            Map<String, String> parameters) throws HandlerGenericException {
        ReportOfCalificationsBySuppliers recordOfReport = new ReportOfCalificationsBySuppliers();
        SupplyBLO supplyBLO = new SupplyBLO();
        CategoryBLO categoryBLO = new CategoryBLO();
        StateBLO stateBLO = new StateBLO();
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        recordOfReport.setNit(supplier.getNit());
        recordOfReport.setSapCode(supplier.getSapCode());
        recordOfReport.setName(supplier.getBusinessName());
        recordOfReport.setSupply(supplyBLO.get(supplier.getIdSupply()).getName());
        recordOfReport.setCategory(categoryBLO.get(supplier.getIdCategory()).getName());
        recordOfReport.setCompanySize(companySizeBLO.get(supplier.getIdCompanySize()).getName());
        recordOfReport.setIdSupplier(supplierByCall.getIdSupplier());
        recordOfReport.setIdSupplierByCall(supplierByCall.getId());
        recordOfReport.setIdState(supplierByCall.getIdState());
        recordOfReport.setStates(stateBLO.getAll());

        String typeReport = parameters.get("type");

        if (null == typeReport) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        if ("SUPPLIER_EVALUATOR".equals(typeReport)) {
            AnswerBLO answerBLO = new AnswerBLO();
            recordOfReport = answerBLO.buildReportOfAverageGradeBySupplier(supplierByCall.getId(), recordOfReport,
                    parameters);
        } else {
            if ("TECHNICAL_MANAGER".equals(typeReport)) {
                TechnicalTeamAnswerBLO technicalTeamAnswerBLO = new TechnicalTeamAnswerBLO();
                recordOfReport = technicalTeamAnswerBLO.buildReportOfTechnicalTeam(supplierByCall.getId(),
                        recordOfReport, parameters);
                ManagerTeamAnswerBLO managerTeamAnswerBLO = new ManagerTeamAnswerBLO();
                recordOfReport = managerTeamAnswerBLO.buildReportOfManagerTeam(supplierByCall.getId(), recordOfReport);
            }
        }

        return recordOfReport;
    }

    public List<ReportOfCalificationsBySuppliers> getThemWillPassToNextStage(Map<String, String> parameters)
            throws HandlerGenericException {
        SupplierBLO supplierBLO = new SupplierBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        String nameNextStage = parameters.get("stage");
        if (null == nameNextStage) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        List<SupplierByCallDTO> evaluatedSuppliers = new ArrayList<SupplierByCallDTO>();
        if ("TechnicalTeam".equals(nameNextStage)) {
            evaluatedSuppliers = supplierByCallBLO.getFinishedByStage(SurveyStates.ENDED_EVALUATOR);
        }

        if ("ManagerTeam".equals(nameNextStage)) {
            evaluatedSuppliers = supplierByCallBLO.getFinishedByStage(SurveyStates.ENDED_TECHNICAL_TEAM);
        }

        List<ReportOfCalificationsBySuppliers> response = new ArrayList<ReportOfCalificationsBySuppliers>();
        Map<String, String> parametersToGenerateReport = new HashMap<String, String>();
        for (SupplierByCallDTO supplierByCall : evaluatedSuppliers) {
            parametersToGenerateReport.put("type", "SUPPLIER_EVALUATOR");
            ReportOfCalificationsBySuppliers reportBySupplier = new ReportOfCalificationsBySuppliers();
            if ("TechnicalTeam".equals(nameNextStage)) {
                reportBySupplier = getRecordOfReport(supplierByCall, supplierBLO.get(supplierByCall.getIdSupplier()),
                        parametersToGenerateReport);
            }

            if ("ManagerTeam".equals(nameNextStage)) {
                reportBySupplier = getRecordOfReport(supplierByCall, supplierBLO.get(supplierByCall.getIdSupplier()),
                        parametersToGenerateReport);
                parametersToGenerateReport.put("type", "TECHNICAL_MANAGER");
                ReportOfCalificationsBySuppliers reportUntilTechnicalTeam = getRecordOfReport(supplierByCall,
                        supplierBLO.get(supplierByCall.getIdSupplier()), parametersToGenerateReport);
                reportBySupplier.setTotalScoreInService(reportUntilTechnicalTeam.getTotalScoreInService());
                reportBySupplier.setServices(reportUntilTechnicalTeam.getServices());
            }

            response.add(reportBySupplier);
        }

        return response;
    }

    public InformationFromSupplier getParticipantsToTechnicalTeam(String year) throws HandlerGenericException {
        List<Object> listYears = getFieldAll(0, VIEW_CALL_BY_YEAR);
        if (null == year || year.trim().isEmpty()) {
            year = (String) listYears.get(0);
        }

        List<SurveyStates> statesIncludInTechnicalTeamStage = new ArrayList<SurveyStates>();
        statesIncludInTechnicalTeamStage.add(SurveyStates.NOT_STARTED_TECHNICAL_TEAM);
        statesIncludInTechnicalTeamStage.add(SurveyStates.TECHNICAL_TEAM);
        statesIncludInTechnicalTeamStage.add(SurveyStates.ENDED_TECHNICAL_TEAM);

        SupplierBLO supplierBLO = new SupplierBLO();
        List<DTO> callsBySupplier = identifyParticpantsByCallYearAndStageStates(year, statesIncludInTechnicalTeamStage);

        SupplierToNextStageBLO supplierToTechnicalTeamBLO = new SupplierToNextStageBLO();
        callsBySupplier = supplierToTechnicalTeamBLO.getParticipantsByTechnicalTeamMember(callsBySupplier);

        InformationFromSupplier participantsToTechnicalTeam = supplierBLO.getInformationFromSuppliers(listYears,
                callsBySupplier);

        Map<String, List<DTO>> currentMasters = participantsToTechnicalTeam.getMasters();
        ServiceBLO serviceBLO = new ServiceBLO();
        ItemBLO itemBLO = new ItemBLO();
        UserBLO userBLO = new UserBLO();
        StateBLO stateBLO = new StateBLO();
        TechnicalTeamAnswerBLO technicalTeamAnswerBLO = new TechnicalTeamAnswerBLO();
        TechnicalTeamCommentBLO technicalTeamCommentBLO = new TechnicalTeamCommentBLO();
        EvaluationScaleBLO evaluationScaleBLO = new EvaluationScaleBLO();
        currentMasters.put("Service", serviceBLO.getAll());
        currentMasters.put("Item", itemBLO.getAll());
        currentMasters.put("State", stateBLO.getAll());
        currentMasters.put("EvaluationScale", evaluationScaleBLO.getAllBy("applyTo",
                SurveyStates.TECHNICAL_TEAM.toString(), "vwEvaluationScalesByApplyTo"));
        currentMasters.put("User", userBLO.getAllBy("name", userBLO.getNameUserInSession(), "vwUsersByName"));

        Map<String, List<Object>> listIdsSupplierByCall = Common.getDtoFields(callsBySupplier, new String[] { "[id]" },
                SupplierByCallDTO.class);

        List<Object> idsSupplierByCall = listIdsSupplierByCall.get("[id]");

        List<DTO> answers = new ArrayList<DTO>();
        List<DTO> comments = new ArrayList<DTO>();
        for (Object idSupplierByCall : idsSupplierByCall) {
            List<DTO> auxiliarAnswer = technicalTeamAnswerBLO.getAllBy(FieldToFilter.FIELD_SUPPLIER_BY_CALL,
                    idSupplierByCall.toString(), "vwTechnicalTeamAnswersByIdSupplierByCall");
            List<DTO> auxiliarComment = technicalTeamCommentBLO.getAllBy(FieldToFilter.FIELD_SUPPLIER_BY_CALL,
                    idSupplierByCall.toString(), "vwTechnicalTeamCommentsByIdSupplierByCall");

            if (!auxiliarAnswer.isEmpty()) {
                answers.addAll(auxiliarAnswer);
            }

            if (!auxiliarComment.isEmpty()) {
                comments.addAll(auxiliarComment);
            }

        }

        currentMasters.put("TechnicalTeamAnswer", answers);
        currentMasters.put("TechnicalTeamComment", comments);
        participantsToTechnicalTeam.setMasters(currentMasters);

        return participantsToTechnicalTeam;
    }

    public InformationFromSupplier getParticipantsToManagerTeam(String year) throws HandlerGenericException {
        List<Object> listYears = getFieldAll(0, VIEW_CALL_BY_YEAR);
        if (null == year || year.trim().isEmpty()) {
            year = (String) listYears.get(0);
        }

        UserBLO userBLO = new UserBLO();
        rules = new SectionRule();
        String idCall = getIdCallByYear(year);
        ManagerTeamBLO managerTeamBLO = new ManagerTeamBLO();
        List<String> managerTeamInCall = managerTeamBLO.getIdOfManagerTeamMembersInCall(idCall);
        if (userBLO.isRol(Rol.MANAGER_TEAM.toString())
                && !managerTeamInCall.contains(userBLO.getUserInSession().getId())) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
        }

        List<SurveyStates> statesIncludInManagerTeamStage = new ArrayList<SurveyStates>();
        statesIncludInManagerTeamStage.add(SurveyStates.NOT_STARTED_MANAGER_TEAM);
        statesIncludInManagerTeamStage.add(SurveyStates.MANAGER_TEAM);
        statesIncludInManagerTeamStage.add(SurveyStates.ENDED_MANAGER_TEAM);

        SupplierBLO supplierBLO = new SupplierBLO();
        List<DTO> callsBySupplier = identifyParticpantsByCallYearAndStageStates(year, statesIncludInManagerTeamStage);

        InformationFromSupplier participantsToManagerTeam = supplierBLO.getInformationFromSuppliers(listYears,
                callsBySupplier);

        Map<String, List<DTO>> currentMasters = participantsToManagerTeam.getMasters();
        ManagerTeamAnswerBLO managerTeamAnswerBLO = new ManagerTeamAnswerBLO();
        StateBLO stateBLO = new StateBLO();
        RolBLO rolBLO = new RolBLO();
        EvaluationScaleBLO evaluationScaleBLO = new EvaluationScaleBLO();
        currentMasters.put("EvaluationScale", evaluationScaleBLO.getAllBy("applyTo",
                SurveyStates.MANAGER_TEAM.toString(), "vwEvaluationScalesByApplyTo"));
        currentMasters.put("State", stateBLO.getAll());
        currentMasters.put("Rol", rolBLO.getAll());
        currentMasters.put("User", userBLO.getAllBy("name", userBLO.getNameUserInSession(), "vwUsersByName"));

        if (userBLO.isRol(Rol.LIBERATOR.toString()) || userBLO.isRol(Rol.ADMINISTRATOR.toString())) {
            rules.setRulesToSection(SurveySection.LIBERATOR.getNameSection(), rules.buildRules(true, true));
        }

        Map<String, List<Object>> listIdsSupplierByCall = Common.getDtoFields(callsBySupplier, new String[] { "[id]" },
                SupplierByCallDTO.class);

        List<Object> idsSupplierByCall = listIdsSupplierByCall.get("[id]");

        List<DTO> answers = new ArrayList<DTO>();
        String nameUserInSession = userBLO.getNameUserInSession();
        for (Object idSupplierByCall : idsSupplierByCall) {
            Map<String, String> filter = new HashMap<String, String>();
            filter.put(FieldToFilter.FIELD_SUPPLIER_BY_CALL, idSupplierByCall.toString());
            if (!userBLO.isRol(Rol.LIBERATOR.toString()) && !userBLO.isRol(Rol.ADMINISTRATOR.toString())) {
                filter.put("whoEvaluate", nameUserInSession);
            }
            List<DTO> auxiliarAnswer = managerTeamAnswerBLO.getAllBy(filter,
                    "vwManagerTeamAnswersByIdSupplierByCallAndWhoEvaluate");

            if (!auxiliarAnswer.isEmpty()) {
                answers.addAll(auxiliarAnswer);
            }

        }

        List<DTO> managersInCall = managerTeamBLO.getAllBy(FieldToFilter.FIELD_CALL, idCall, "vwManagerTeam");
        Map<String, List<Object>> listIds = Common.getDtoFields(managersInCall, new String[] { "[idUser]" },
                ManagerTeamDTO.class);
        currentMasters.put("Managers", userBLO.getAllBy("id", Common.getIdsFromList(listIds.get("[idUser]"))));
        currentMasters.put("ManagerTeamAnswer", answers);
        participantsToManagerTeam.setMasters(currentMasters);

        return participantsToManagerTeam;
    }

    protected List<DTO> identifyParticpantsByCallYearAndStageStates(String year, List<SurveyStates> statesOfStage)
            throws HandlerGenericException {
        String viewName = "vwSuppliersByCallIdStateAndIdCall";
        StateBLO stateBLO = new StateBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        Map<String, String> filter = new HashMap<String, String>();
        filter.put(FieldToFilter.FIELD_CALL, getIdCallByYear(year));
        List<DTO> callsBySupplier = new ArrayList<DTO>();
        for (SurveyStates state : statesOfStage) {
            String idState = stateBLO.getStateByShortName(state.toString()).getId();
            filter.put(FieldToFilter.FIELD_STATE, idState);
            callsBySupplier.addAll(supplierByCallBLO.getAllBy(filter, viewName));
        }

        return callsBySupplier;
    }

    /**
     * De todas las convocatorias creadas optiene la última que fue creada.
     * 
     * @return Última convocatoria creada
     * @throws HandlerGenericException
     */
    private CallDTO getCurrentCall() throws HandlerGenericException {
        List<Object> listYears = getFieldAll(0, VIEW_CALL_BY_YEAR);
        String year = (String) listYears.get(0);
        return get(getIdCallByYear(year));
    }

    /**
     * Dadas las fechas de vencimiento, se determina que fase es en la que se
     * encuentra la convocatoria
     * 
     * @return Fase en la que se encuentra la convocatoria
     * @throws HandlerGenericException
     */
    public StagesCall identifyCurrentStage() throws HandlerGenericException {
        Map<StagesCall, Boolean> stageCaduced = new LinkedHashMap<StagesCall, Boolean>();
        StagesCall currentStage = null;
        CallDTO call = getCurrentCall();
        stageCaduced.put(StagesCall.SUPPLIER, call.isCaducedDeadLineToMakeSurvey());
        stageCaduced.put(StagesCall.EVALUATOR, call.isCaducedDeadLineToMakeSurveyEvaluator());
        stageCaduced.put(StagesCall.TECHNICAL_TEAM, call.isCaducedDeadLineToMakeSurveyTechnicalTeam());
        // Si las anteriores no están vencidas, es porque la fase final está activa
        stageCaduced.put(StagesCall.MANAGER_TEAM, false);

        Iterator<StagesCall> iterator = stageCaduced.keySet().iterator();
        while (iterator.hasNext()) {
            StagesCall stage = iterator.next();
            if (!stageCaduced.get(stage)) {
                currentStage = stage;
                break;
            }
        }

        return currentStage;
    }

    /**
     * Dado el rol del usuario en sessión se identifica cual es la fase que le
     * ertenece a cada rol del sistema
     * 
     * @return Fase a la que pertenece el rol del usuario en session
     * @throws HandlerGenericException
     */
    private StagesCall currentStageByRol() throws HandlerGenericException {
        StagesCall currentStage = null;
        UserBLO userBLO = new UserBLO();
        if (userBLO.isRol(Rol.LIBERATOR.toString()) || userBLO.isRol(Rol.ADMINISTRATOR.toString())) {
            currentStage = identifyCurrentStage();
        }

        if (userBLO.isRol(Rol.EVALUATOR.toString())) {
            currentStage = StagesCall.EVALUATOR;
        }

        if (userBLO.isRol(Rol.TECHNICAL_TEAM.toString())) {
            currentStage = StagesCall.TECHNICAL_TEAM;
        }

        if (userBLO.isRol(Rol.MANAGER_TEAM.toString())) {
            currentStage = StagesCall.MANAGER_TEAM;
        }

        if (null == currentStage) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
        }

        return currentStage;
    }

    public StatisticalProgress getStatisticalProgress(String filterName) throws HandlerGenericException {
        filterName = filterName.trim();

        StateBLO stateBLO = new StateBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        StatisticalProgress summaryProgress = new StatisticalProgress();

        StagesCall currentStage = currentStageByRol();
        List<SurveyStates> statesOfStage = stateBLO.getStatesByStageCall(currentStage);
        List<SupplierByCallDTO> suppliersByCall = supplierByCallBLO.getAllByStates(getCurrentCall().getId(),
                statesOfStage);
        SurveyStates finalStateOfStage = stateBLO.getFinalStateByStageCall(currentStage);
        String idStateOfEndedStage = stateBLO.getStateByShortName(finalStateOfStage.toString()).getId();
        summaryProgress.totalSupplier = (short) suppliersByCall.size();
        for (SupplierByCallDTO supplierByCall : suppliersByCall) {
            if (idStateOfEndedStage.equals(supplierByCall.getIdState())) {
                SupplierBLO supplierBLO = new SupplierBLO();
                String anyName = "";
                SupplierDTO supplier = supplierBLO.get(supplierByCall.getIdSupplier());
                if ("COMPANY_SIZE_FILTER".equals(filterName)) {
                    CompanySizeBLO companySizeBLO = new CompanySizeBLO();
                    String idCompanySize = supplier.getIdCompanySize();
                    anyName = companySizeBLO.get(idCompanySize).getName();
                }

                if ("SUPPLY_FILTER".equals(filterName)) {
                    SupplyBLO supplyBLO = new SupplyBLO();
                    String idSupply = supplier.getIdSupply();
                    anyName = supplyBLO.get(idSupply).getName();
                }

                if ("COUNTRY_FILTER".equals(filterName)) {
                    CountryBLO countryBLO = new CountryBLO();
                    String idCountry = supplier.getIdCountry();
                    anyName = countryBLO.get(idCountry).getName();
                }

                summaryProgress.createAxisOrCounter(anyName);
            }
        }
        summaryProgress.calculatePercentageInAxes();
        return summaryProgress;
    }

    /**
     * @param call
     * @return Colección con el resumén de la carga de proveedores
     * @throws HandlerGenericException
     */
    public List<SummaryToLoadSupplier> loadSupplierToCall(CallDTO call) throws HandlerGenericException {
        checkRulesToLoadSuppliers(call);
        List<SummaryToLoadSupplier> summary = new ArrayList<SummaryToLoadSupplier>();
        for (SupplierDTO supplier : call.getSupplier()) {
            SupplierBLO supplierBLO = new SupplierBLO();
            SummaryToLoadSupplier summaryRecord = new SummaryToLoadSupplier();
            if (allowLoadSupplierToCall(call, supplier, summaryRecord)) {
                try {
                    supplier.nameCompanySizeToLoad = null;
                    supplier.nameSupplyToLoad = null;
                    supplier.nameCountryToLoad = null;
                    supplier = supplierBLO.createByFirstTime(supplier);
                    summaryRecord.status = "CREATED";
                    SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
                    supplierByCallBLO.asociateSupplierToCall(supplier, call.getId()).getId();
                } catch (HandlerGenericException exception) {
                    summaryRecord.status = exception.getMessage();
                }
            }
            summaryRecord.sapCode = supplier.getSapCode();
            summaryRecord.nit = supplier.getNit();
            summaryRecord.name = supplier.getBusinessName();
            summary.add(summaryRecord);
        }

        return summary;
    }

    /**
     * Verifica que la fecha para los proveedores hacer la encuesta no este caducada
     * y que existan proveedores definidos para cargar
     * 
     * @throws HandlerGenericException
     */
    private void checkRulesToLoadSuppliers(CallDTO call) throws HandlerGenericException {
        if (call.isCaducedDeadLineToMakeSurvey()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.DATE_TO_MAKE_SURVEY_EXCEEDED.toString());
        } else {
            if (call.getSupplier().isEmpty()) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.UNDEFINED_SUPPLIERS.toString());
            }
        }
    }

    /**
     * Verifica las reglas para cargar los proveedores a la convocatoria
     * 
     * @param supplier      Proveedor a cargar
     * @param summaryRecord actualiza el estado del registro a cargar
     * @throws HandlerGenericException
     */
    private boolean allowLoadSupplierToCall(CallDTO call, SupplierDTO supplier, SummaryToLoadSupplier summaryRecord)
            throws HandlerGenericException {
        boolean allowLoad = true;

        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        CompanySizeDTO companySize = companySizeBLO.getBy("name", supplier.nameCompanySizeToLoad);
        String idCompanySize = companySize == null ? null : companySize.getId();
        if (null == idCompanySize || idCompanySize.isEmpty()) {
            summaryRecord.status = "COMPANY_SIZE_DONT_EXIST";
            allowLoad = false;
        } else {
            supplier.setIdCompanySize(idCompanySize);
        }

        SupplyBLO supplyBLO = new SupplyBLO();
        SupplyDTO supply = supplyBLO.getBy("name", supplier.nameSupplyToLoad);
        String idSupply = supply == null ? null : supply.getId();
        if (null == idSupply || idSupply.isEmpty()) {
            summaryRecord.status = "SUPPLY_DONT_EXIST";
            allowLoad = false;
        } else {
            supplier.setIdSupply(idSupply);
        }

        CountryBLO countryBLO = new CountryBLO();
        CountryDTO country = countryBLO.getBy("name", supplier.nameCountryToLoad);
        if (!(country instanceof CountryDTO)) {
            summaryRecord.status = "COUNTRY_DONT_EXIST";
            allowLoad = false;
        } else {
            supplier.setIdCountry(country.getId());
        }

        SupplierBLO supplierBLO = new SupplierBLO();
        SupplierDTO existingSupplier = supplierBLO.getBySAPCodeOrNIT(supplier.getSapCode(), supplier.getNit());
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        if (existingSupplier != null && supplier.getId() == null
                && supplierByCallBLO.existSupplierInCall(existingSupplier.getId(), call.getId())) {
            summaryRecord.status = "DUPLICATED";
            allowLoad = false;
        } else {
            if (existingSupplier != null) {
                supplier = existingSupplier;
            }
        }

        if (!supplierBLO.existInGeneralDirectoryByNit(supplier.getNit())) {
            summaryRecord.status = "DONT_EXIST_IN_DIRECTORY";
            allowLoad = false;
        }

        return allowLoad;
    }

    // TODO: Create documentation
    protected void closeCall() throws HandlerGenericException {
        CallDTO call = getCallActive();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        if (call.isCaducedDateToFinishCall()) {
            call.setActive(false);
            super.save(call);
            supplierByCallBLO.markAsNotParticipated(call.getId());
        }

        if (call.isCaducedDeadLineToMakeSurvey()) {
            supplierByCallBLO.markAsNotParticipated(call.getId());
        }
    }

    private class FieldToFilter {
        public static final String FIELD_SUPPLIER = "idSupplier";
        public static final String FIELD_SUPPLIER_BY_CALL = "idSupplierByCall";
        public static final String FIELD_STATE = "idState";
        public static final String FIELD_CALL = "idCall";

        private FieldToFilter() {
            throw new IllegalStateException("Utility class");
        }
    }

}
