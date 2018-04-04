package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SupplierToNextStageDAO;
import com.nutresa.exemplary_provider.dtl.NotificationType;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.SupplierToNextStageDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierToNextStageBLO extends GenericBLO<SupplierToNextStageDTO, SupplierToNextStageDAO> {
    private static final String STATE_SUCCESS = "OK";
    private static final String STATE_FAILED = "KO";
    private static final String SEPARATOR = ":";
    private String notice;

    public SupplierToNextStageBLO() {
        super(SupplierToNextStageDAO.class);
    }

    public String getNotice() {
        return notice;
    }

    public String approveToNextStage(SupplierToNextStageDTO suppliersToNextStage) throws HandlerGenericException {
        String notified = STATE_FAILED;
        if (null == suppliersToNextStage.getStage()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        if (suppliersToNextStage.getStage().equals("TechnicalTeam")) {
            notified = approveToTechnicalTeam(suppliersToNextStage.getIdSuppliersByCall());
        }

        if (suppliersToNextStage.getStage().equals("ManagerTeam")) {
            notified = approveToManagerTeam(suppliersToNextStage.getIdSuppliersByCall());
        }

        return notified;
    }

    private String approveToTechnicalTeam(List<String> idSuppliersToApprove) throws HandlerGenericException {
        String notified = STATE_FAILED;
        NotificationBLO notificationBLO = new NotificationBLO();
        Map<String, String> filter = new LinkedHashMap<String, String>();
        for (String idSupplierByCall : idSuppliersToApprove) {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            SupplierBLO supplierBLO = new SupplierBLO();
            SupplierByCallDTO supplierByCall = supplierByCallBLO.get(idSupplierByCall);
            SupplierDTO supplier = supplierBLO.get(supplierByCall.getIdSupplier());
            if (supplier instanceof SupplierDTO) {
                String temporalId = supplier.getIdSupply().concat(
                        SEPARATOR.concat(supplier.getIdCategory().concat(SEPARATOR.concat(supplier.getIdCountry()))));
                filter.put(temporalId, temporalId);
                StateBLO stateBLO = new StateBLO();
                notificationBLO.sendNotificationTypeToSupplier(supplier,
                        NotificationType.SUPPLIER_CALLED_BY_TECHNICAL_TEAM);
                supplierByCall.setIdState(
                        stateBLO.getStateByShortName(SurveyStates.NOT_STARTED_TECHNICAL_TEAM.toString()).getId());
                supplierByCallBLO.update(supplierByCall);
                notified = STATE_SUCCESS;
            }
        }
        UserBLO userBLO = new UserBLO();
        userBLO.notifyToTechnicalTeam(filter);
        return notified;
    }

    private String approveToManagerTeam(List<String> idSuppliersToApprove) throws HandlerGenericException {
        String notified = STATE_FAILED;
        NotificationBLO notificationBLO = new NotificationBLO();
        String idCall = null;
        for (String idSupplierByCall : idSuppliersToApprove) {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            SupplierBLO supplierBLO = new SupplierBLO();
            SupplierByCallDTO supplierByCall = supplierByCallBLO.get(idSupplierByCall);
            SupplierDTO supplier = supplierBLO.get(supplierByCall.getIdSupplier());
            idCall = supplierByCall.getIdCall();
            if (supplier instanceof SupplierDTO) {
                StateBLO stateBLO = new StateBLO();
                notificationBLO.sendNotificationTypeToSupplier(supplier,
                        NotificationType.SUPPLIER_CALLED_BY_MANAGER_TEAM);
                supplierByCall.setIdState(
                        stateBLO.getStateByShortName(SurveyStates.NOT_STARTED_MANAGER_TEAM.toString()).getId());
                supplierByCallBLO.update(supplierByCall);
                notified = STATE_SUCCESS;
            }
        }

        UserBLO userBLO = new UserBLO();
        userBLO.notifyToManagerTeam(idCall);
        return notified;
    }

    public String dontApproveToNextStage(SupplierToNextStageDTO suppliersToNextStage) throws HandlerGenericException {
        String notified = STATE_FAILED;
        List<String> idSuppliersToDontApprove = suppliersToNextStage.getIdSuppliersByCall();
        for (String idSupplierByCall : idSuppliersToDontApprove) {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            SupplierBLO supplierBLO = new SupplierBLO();
            SupplierByCallDTO supplierByCall = supplierByCallBLO.get(idSupplierByCall);
            SupplierDTO supplier = supplierBLO.get(supplierByCall.getIdSupplier());
            if (supplier instanceof SupplierDTO) {
                NotificationBLO notificationBLO = new NotificationBLO();
                StateBLO stateBLO = new StateBLO();
                notificationBLO.sendNotificationTypeToSupplier(supplier, NotificationType.SUPPLIER_DISCARDED);

                if (suppliersToNextStage.getStage().equals("TechnicalTeam")) {
                    supplierByCall.setIdState(
                            stateBLO.getStateByShortName(SurveyStates.DONT_APPLY_TECHNICAL_TEAM.toString()).getId());
                }

                if (suppliersToNextStage.getStage().equals("ManagerTeam")) {
                    supplierByCall.setIdState(
                            stateBLO.getStateByShortName(SurveyStates.DONT_APPLY_MANAGER_TEAM.toString()).getId());
                }

                supplierByCallBLO.update(supplierByCall);
                notified = STATE_SUCCESS;
            }
        }

        return notified;
    }

    public String finishSurveyMassive(SupplierToNextStageDTO suppliersToTechnicalTeam) throws HandlerGenericException {
        String notified = STATE_FAILED;
        List<String> idSuppliersToApprove = suppliersToTechnicalTeam.getIdSuppliersByCall();
        for (String idSupplierByCall : idSuppliersToApprove) {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            SupplierByCallDTO supplierByCall = supplierByCallBLO.get(idSupplierByCall);
            supplierByCallBLO.finishSurvey(supplierByCall);
            notified = STATE_SUCCESS;
        }

        return notified;
    }

    public String finishSurveyManagerTeam(String year) throws HandlerGenericException {
        String notified = STATE_FAILED;
        List<Object> listYears = getFieldAll(0, "vwCallsByYear");
        if (null == year || year.trim().isEmpty()) {
            year = (String) listYears.get(0);
        }

        List<SurveyStates> statesIncludInManagerTeamStage = new ArrayList<SurveyStates>();
        statesIncludInManagerTeamStage.add(SurveyStates.MANAGER_TEAM);

        CallBLO callBLO = new CallBLO();
        List<DTO> callsBySupplier = callBLO.identifyParticpantsByCallYearAndStageStates(year,
                statesIncludInManagerTeamStage);

        Map<String, List<Object>> listIdsSupplierByCall = Common.getDtoFields(callsBySupplier, new String[] { "[id]" },
                SupplierByCallDTO.class);
        List<Object> idsSupplierByCall = listIdsSupplierByCall.get("[id]");

        String idCall = callBLO.getIdCallByYear(year);
        ManagerTeamBLO managerTeamBLO = new ManagerTeamBLO();
        List<String> managerTeamInCall = managerTeamBLO.getIdOfManagerTeamMembersInCall(idCall);

        short counterFinished = 0;
        for (Object idSupplierByCall : idsSupplierByCall) {
            String temporalId = idSupplierByCall.toString();
            ManagerTeamAnswerBLO managerTeamAnswerBLO = new ManagerTeamAnswerBLO();
            if (managerTeamInCall.size() == managerTeamAnswerBLO.getAnswersOfSupplier(temporalId).size()) {
                SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
                supplierByCallBLO.finishSurvey(supplierByCallBLO.get(temporalId));
                notified = STATE_SUCCESS;
                counterFinished = (short) (counterFinished + 1);
            }
        }

        notice = Short.toString(counterFinished);

        return notified;
    }

    public List<DTO> getParticipantsByTechnicalTeamMember(List<DTO> suppliersByCall) throws HandlerGenericException {
        TechnicalTeamBLO technicalTeamBLO = new TechnicalTeamBLO();
        List<DTO> definitivesSupplierByCall = new ArrayList<DTO>();
        List<TechnicalTeamDTO> members = technicalTeamBLO.getMemberInTeamByUserInSession();
        for (TechnicalTeamDTO member : members) {
            definitivesSupplierByCall.addAll(suppliersByCall);
            String temporalIdTechnicalTeam = member.getIdSupply()
                    .concat(member.getIdCategory().concat(member.getIdCountry()));

            short index = 0;
            while (index < suppliersByCall.size() && !definitivesSupplierByCall.isEmpty()) {
                SupplierBLO supplierBLO = new SupplierBLO();
                SupplierByCallDTO originalSupplierByCall = (SupplierByCallDTO) suppliersByCall.get(index);
                SupplierDTO supplier = supplierBLO.get(originalSupplierByCall.getIdSupplier());
                String temporalIdSupplier = supplier.getIdSupply()
                        .concat(supplier.getIdCategory().concat(supplier.getIdCountry()));
                if (!temporalIdTechnicalTeam.equals(temporalIdSupplier) && !definitivesSupplierByCall.isEmpty()) {
                    definitivesSupplierByCall.remove(suppliersByCall.get(index));
                }

                index = (short) (index + 1);
            }
        }

        return definitivesSupplierByCall;
    }

}