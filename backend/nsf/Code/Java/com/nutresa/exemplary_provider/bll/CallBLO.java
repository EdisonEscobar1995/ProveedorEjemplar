package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.ManagerTeamDTO;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SectionRule;
import com.nutresa.exemplary_provider.dtl.SurveySection;
import com.nutresa.exemplary_provider.dtl.NotificationType;
import com.nutresa.exemplary_provider.dtl.SuppliersInCallDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.queries.InformationFromSupplier;
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
            String[] idFieldNames = { "CompanySize", "Supply" };
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
     * @param parameters
     *            Mapa clave valor de los filtros por los que se van a optener
     *            los resultados
     * @return Collección de datos obtenidos según los parámetros
     *         <code>parameters</code>
     * @throws HandlerGenericException
     *             Con mensaje <code>CALL_NOT_ESPECIFIED</code> si no se envía
     *             el identificador de la convocatoria en los parámetros de
     *             búsqueda. Con mensaje <code>INFORMATION_NOT_FOUND</code> si
     *             no se encontró información para exportar. Con mensaje
     *             <code>ROL_INVALID</code> si el usuario en sesión no tiene el
     *             rol permitido.
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
     * @param idCall
     *            Identificador de la convocatoria que se va consultar.
     * @param suppliers
     *            Collección de proveedores
     * @param parameters
     *            Mapa clave valor de los filtros por los que se van a optener
     *            los resultados
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
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        recordOfReport.setNit(supplier.getNit());
        recordOfReport.setSapCode(supplier.getSapCode());
        recordOfReport.setName(supplier.getBusinessName());
        recordOfReport.setSupply(supplyBLO.get(supplier.getIdSupply()).getName());
        recordOfReport.setCategory(categoryBLO.get(supplier.getIdCategory()).getName());
        recordOfReport.setCompanySize(companySizeBLO.get(supplier.getIdCompanySize()).getName());
        recordOfReport.setIdSupplier(supplierByCall.getIdSupplier());
        recordOfReport.setIdSupplierByCall(supplierByCall.getId());

        String typeReport = parameters.get("type");
        if (typeReport.equals("SUPPLIER_EVALUATOR")) {
            AnswerBLO answerBLO = new AnswerBLO();
            recordOfReport = answerBLO.buildReportOfAverageGradeBySupplier(supplierByCall.getId(), recordOfReport,
                    parameters);
        } else {
            if (typeReport.equals("TECHNICAL_MANAGER")) {
                TechnicalTeamAnswerBLO technicalTeamAnswerBLO = new TechnicalTeamAnswerBLO();
                recordOfReport = technicalTeamAnswerBLO.buildReportOfTechnicalTeam(supplierByCall.getId(),
                        recordOfReport, parameters);
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
        if (nameNextStage.equals("TechnicalTeam")) {
            evaluatedSuppliers = supplierByCallBLO.getFinishedByStage(SurveyStates.ENDED_EVALUATOR);
        }

        if (nameNextStage.equals("ManagerTeam")) {
            evaluatedSuppliers = supplierByCallBLO.getFinishedByStage(SurveyStates.ENDED_TECHNICAL_TEAM);
        }

        List<ReportOfCalificationsBySuppliers> response = new ArrayList<ReportOfCalificationsBySuppliers>();
        Map<String, String> parametersToGenerateReport = new HashMap<String, String>();
        parametersToGenerateReport.put("type", "SUPPLIER_EVALUATOR");
        for (SupplierByCallDTO supplierByCall : evaluatedSuppliers) {
            ReportOfCalificationsBySuppliers reportBySupplier = getRecordOfReport(supplierByCall,
                    supplierBLO.get(supplierByCall.getIdSupplier()), parametersToGenerateReport);
            if (nameNextStage.equals("ManagerTeam")) {
                parametersToGenerateReport.put("type", "TECHNICAL_MANAGER");
                ReportOfCalificationsBySuppliers reportUntilTechnicalTeam = getRecordOfReport(supplierByCall,
                        supplierBLO.get(supplierByCall.getIdSupplier()), parametersToGenerateReport);
                reportBySupplier.setTotalScoreInService(reportUntilTechnicalTeam.getTotalScoreInService());
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


        List<DTO> managersInCall = managerTeamBLO.getAllBy("idCall", idCall, "vwManagerTeam");
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
