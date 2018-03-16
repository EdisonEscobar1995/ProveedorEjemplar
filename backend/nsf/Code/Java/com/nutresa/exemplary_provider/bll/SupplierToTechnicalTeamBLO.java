package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SupplierToTechnicalTeamDAO;
import com.nutresa.exemplary_provider.dtl.NotificationType;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.SupplierToTechnicalTeamDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierToTechnicalTeamBLO extends GenericBLO<SupplierToTechnicalTeamDTO, SupplierToTechnicalTeamDAO> {
    private static final String STATE_SUCCESS = "OK";
    private static final String STATE_FAILED = "KO";
    private static final String SEPARATOR = ":";

    public SupplierToTechnicalTeamBLO() {
        super(SupplierToTechnicalTeamDAO.class);
    }

    public String approveToTechnicalTeam(SupplierToTechnicalTeamDTO suppliersToTechnicalTeam)
            throws HandlerGenericException {
        String notified = STATE_FAILED;
        List<String> idSuppliersToApprove = suppliersToTechnicalTeam.getIdSuppliersByCall();
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

    public String dontApproveToTechnicalTeam(SupplierToTechnicalTeamDTO suppliersToTechnicalTeam)
            throws HandlerGenericException {
        String notified = STATE_FAILED;
        List<String> idSuppliersToApprove = suppliersToTechnicalTeam.getIdSuppliersByCall();
        for (String idSupplierByCall : idSuppliersToApprove) {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            SupplierBLO supplierBLO = new SupplierBLO();
            SupplierByCallDTO supplierByCall = supplierByCallBLO.get(idSupplierByCall);
            SupplierDTO supplier = supplierBLO.get(supplierByCall.getIdSupplier());
            if (supplier instanceof SupplierDTO) {
                NotificationBLO notificationBLO = new NotificationBLO();
                StateBLO stateBLO = new StateBLO();
                notificationBLO.sendNotificationTypeToSupplier(supplier, NotificationType.SUPPLIER_DISCARDED);
                supplierByCall.setIdState(
                        stateBLO.getStateByShortName(SurveyStates.DONT_APPLY_TECHNICAL_TEAM.toString()).getId());
                supplierByCallBLO.update(supplierByCall);
                notified = STATE_SUCCESS;
            }
        }

        return notified;
    }

    public String finishTechnicalTeamSurvey(SupplierToTechnicalTeamDTO suppliersToTechnicalTeam)
            throws HandlerGenericException {
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