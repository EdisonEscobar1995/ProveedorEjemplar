package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Map;
import java.util.Date;
import java.util.Calendar;
import java.util.List;
import java.util.LinkedHashMap;

import com.nutresa.exemplary_provider.dal.AlertDAO;
import com.nutresa.exemplary_provider.dtl.AlertDTO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.dtl.AlertType;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AlertBLO extends GenericBLO<AlertDTO, AlertDAO> {

    public AlertBLO() {
        super(AlertDAO.class);
    }

    /**
     * Toma todas las alertas configuradas y las ejecuta, cierra la convocatoria
     * actual en caso de tener la fecha finalizada
     * 
     * @return Un objeto <code>AlertDTO</code> por defecto
     * @throws HandlerGenericException
     */
    public AlertDTO executeAlerts() throws HandlerGenericException {
        for (AlertType alert : AlertType.values()) {
            NotificationDTO notification = buildNotification(alert);
            if (null != notification.getMessage()) {
                executeAlert(alert, notification);
            }
        }
        CallBLO callBLO = new CallBLO();
        callBLO.closeCall();

        return new AlertDTO();
    }

    /**
     * Ejecuta la alerta especificada
     * 
     * @param alert
     *            Alerta a ejecutar
     * @param notification
     *            Notificación a enviar
     * @throws HandlerGenericException
     */
    private void executeAlert(AlertType alert, NotificationDTO notification) throws HandlerGenericException {
        NotificationBLO notificationBLO = new NotificationBLO();
        CallBLO callBLO = new CallBLO();
        CallDTO call = callBLO.getCallActive();
        Map<String, String> detail = new LinkedHashMap<String, String>();
        String linkButton = "";
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        UserBLO userBLO = new UserBLO();
        List<SurveyStates> stateOfThisEvaluator = new ArrayList<SurveyStates>();
        List<String> evaluators = new ArrayList<String>();
        List<String> sendTo = new ArrayList<String>();
        SupplierBLO supplierBLO = new SupplierBLO();
        boolean sentToSupplier = false;
        switch (alert) {
        case PENDING_VALIDATION_DUE_TO_CHANGE_IN_COMPANY_SIZE:
            if (supplierByCallBLO.existSuppliersInCompanySizeChanged(call.getId())) {
                sendTo = userBLO.getUserEmailsByRol(Rol.LIBERATOR.toString());
                linkButton = notificationBLO.buildLinkModifiedSupplier();
            }
            break;
        case SURVEY_PARTIALLY_SAVED_BY_THE_PROVIDER:
            stateOfThisEvaluator.add(SurveyStates.SUPPLIER);
            List<SupplierDTO> suppliers = supplierByCallBLO.getSuppliersByCallAndStateEvaluation(call.getId(),
                    stateOfThisEvaluator);
            for (SupplierDTO supplier : suppliers) {
                List<String> emails = new ArrayList<String>();
                emails.add(supplier.getEmailOfContact());
                detail = new LinkedHashMap<String, String>();
                Map<String, String> informationInOtherDataBase = supplierBLO.getInformationInOtherDataBase(supplier);
                detail.put("Usuario", informationInOtherDataBase.get("userName"));
                detail.put("Contraseña", informationInOtherDataBase.get("password"));

                notificationBLO.sendAlarm(emails, notification, linkButton, detail);
                sentToSupplier = true;
            }
            break;
        case SURVEY_PARTIALLY_SAVED_BY_THE_EVALUATOR:
            stateOfThisEvaluator.add(SurveyStates.EVALUATOR);
            evaluators = supplierByCallBLO.getResponsibleOfEvaluation(call.getId(), stateOfThisEvaluator);
            linkButton = notificationBLO.buildLinkSurvey();
            break;
        case PENDING_EVALUATION_BY_THE_TECHNICAL_TEAM:
            stateOfThisEvaluator.add(SurveyStates.NOT_STARTED_TECHNICAL_TEAM);
            evaluators = supplierByCallBLO.getResponsibleOfEvaluation(call.getId(), stateOfThisEvaluator);
            linkButton = notificationBLO.buildLinkTechnicalTeam();
            break;
        case SURVEY_PARTIALLY_SAVED_BY_THE_TECHNICAL_TEAM:
            stateOfThisEvaluator.add(SurveyStates.TECHNICAL_TEAM);
            evaluators = supplierByCallBLO.getResponsibleOfEvaluation(call.getId(), stateOfThisEvaluator);
            linkButton = notificationBLO.buildLinkTechnicalTeam();
            break;
        case PENDING_EVALUATION_BY_THE_MANAGER_TEAM:
            sendTo = userBLO.getUserEmailsByRol(Rol.MANAGER_TEAM.toString());
            linkButton = notificationBLO.buildLinkManagerTeam();
            break;
        case SURVEY_PARTIALLY_SAVED_BY_THE_MANAGER_TEAM:
            stateOfThisEvaluator.add(SurveyStates.MANAGER_TEAM);
            evaluators = supplierByCallBLO.getResponsibleOfEvaluation(call.getId(), stateOfThisEvaluator);
            linkButton = notificationBLO.buildLinkManagerTeam();
            break;
        default:
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        if (!evaluators.isEmpty()) {
            for (String name : evaluators) {
                UserDTO user = userBLO.getUsersByName(name);
                if (user instanceof UserDTO) {
                    sendTo.add(user.getEmail());
                }
            }
        }

        if (!sentToSupplier) {
            for (String email : sendTo) {
                List<String> emails = new ArrayList<String>();
                emails.add(email);
                notificationBLO.sendAlarm(emails, notification, linkButton, detail);
            }
        }

    }

    /**
     * Dada una alerta construye la notificación a enviar
     * 
     * @param alert
     *            Alerta a ejecutar
     * @return Notificación a enviar
     * @throws HandlerGenericException
     */
    private NotificationDTO buildNotification(AlertType alert) throws HandlerGenericException {
        AlertDAO alertDAO = new AlertDAO();
        AlertDTO alertToSend = alertDAO.getBy("shortName", alert.toString());
        NotificationDTO notification = new NotificationDTO();

        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(alertToSend.getDateExecuted());
        calendar.add(Calendar.DATE, alertToSend.getDays());
        Date dateExecutedNextAlert = calendar.getTime();

        if (alertToSend.isActive() && currentDate.compareTo(dateExecutedNextAlert) >= 0) {
            notification.setMessage(alertToSend.getMessage());
            notification.setSubject(alertToSend.getSubject());
        }

        alertToSend.setDateExecuted(currentDate);
        super.save(alertToSend);

        return notification;
    }

}
