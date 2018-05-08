package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Map;
import java.util.LinkedHashMap;

import com.nutresa.exemplary_provider.dal.AlertDAO;
import com.nutresa.exemplary_provider.dtl.AlertDTO;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.dtl.AlertType;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AlertBLO extends GenericBLO<AlertDTO, AlertDAO> {

    public AlertBLO() {
        super(AlertDAO.class);
    }

    // TODO: Create documentation
    public AlertDTO executeAlerts() throws HandlerGenericException {
        NotificationBLO notificationBLO = new NotificationBLO();
        for (AlertType alert : AlertType.values()) {
            Map<String, String> detail = new LinkedHashMap<String, String>();
            NotificationDTO notification = buildNotification(alert);
            switch (alert) {
            case PENDING_VALIDATION_DUE_TO_CHANGE_IN_SIZE_IN_THE_COMPANY:
                // TODO: build parameters of notification for this type
                break;
            case SURVEY_PARTIALLY_SAVED_BY_THE_PROVIDER:
                // TODO: build parameters of notification for this type and build detail
                break;
            case SURVEY_PARTIALLY_SAVED_BY_THE_EVALUATION_TEAM:
                // TODO: build parameters of notification for this type
                break;
            case PENDING_EVALUATION_BY_THE_TECHNICAL_TEAM:
                // TODO: build parameters of notification for this type
                break;
            case PENDING_EVALUATION_BY_THE_MANAGER_TEAM:
                // TODO: build parameters of notification for this type
                break;
            case SURVEY_PARTIALLY_SAVED_BY_THE_TECHNICAL_TEAM:
                // TODO: build parameters of notification for this type
                break;
            case SURVEY_PARTIALLY_SAVED_BY_THE_MANAGER_TEAM:
                // TODO: build parameters of notification for this type
                break;
            default:
                throw new HandlerGenericException(HandlerGenericExceptionTypes.INVALID_VALUE.toString());
            }
            notificationBLO.sendAlarm(new ArrayList<String>(), notification, "linkButton", detail);
        }

        // TODO: Incluir los requisitos de la convocatoria
        
        return new AlertDTO();
    }

    // TODO: Create documentation
    private NotificationDTO buildNotification(AlertType alert) throws HandlerGenericException {
        AlertDAO alertDAO = new AlertDAO();
        AlertDTO alertToSend = alertDAO.getBy("shortName", alert.toString());
        NotificationDTO notification = new NotificationDTO();
        notification.setMessage(alertToSend.getMessage());
        notification.setSubject(alertToSend.getSubject());

        return notification;
    }

}
