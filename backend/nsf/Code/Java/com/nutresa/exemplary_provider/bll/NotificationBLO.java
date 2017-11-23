package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.email.DominoEmail;

import com.nutresa.exemplary_provider.dal.NotificationDAO;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.dtl.RolDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;
import com.nutresa.exemplary_provider.utils.TemplateMail;

public class NotificationBLO extends GenericBLO<NotificationDTO, NotificationDAO> {

    public NotificationBLO() {
        super(NotificationDAO.class);
    }

    public void notifyChangeCompanySize() throws HandlerGenericException {
        try {
            List<String> sendTo = new ArrayList<String>();
            List<UserDTO> users = getUsersByRolName("LIBERATOR");
            for (UserDTO user : users) {
                sendTo.add(user.getEmail());
            }
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("CHANGE_COMPANY_SIZE");
            notification.setMessage(notification.getMessage().concat(
                    "<a href='https://www.google.com.co'>Link de consulta</a>"));
            sendNotification(sendTo, notification);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    public void notifySurveyCompleted() throws HandlerGenericException {
        try {
            List<String> sendTo = new ArrayList<String>();
            List<UserDTO> users = getUsersByRolName("LIBERATOR");
            users.addAll(getUsersByRolName("ADMINISTRATOR"));
            for (UserDTO user : users) {
                sendTo.add(user.getEmail());
            }
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("SURVEY_ENDED_BY_SUPPLIER");
            sendNotification(sendTo, notification);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    private List<UserDTO> getUsersByRolName(String nameRol) throws HandlerGenericException {
        RolBLO rolBLO = new RolBLO();
        UserBLO userBLO = new UserBLO();
        List<UserDTO> users = new ArrayList<UserDTO>();
        try {
            RolDTO rol = rolBLO.getIdRolLiberator(nameRol);
            users = userBLO.getUsersByRol(rol.getId());
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return users;
    }

    @SuppressWarnings("deprecation")
    private void sendNotification(List<String> sendTo, NotificationDTO notification) throws HandlerGenericException {
        try {
            StringBuilder body = new StringBuilder();
            DominoEmail email = new DominoEmail();
            body.append(TemplateMail.buildMessage(notification.getMessage()));
            email.setTo(sendTo);
            List<String> withCopy = notification.getWithCopy();
            if (withCopy != null && !withCopy.isEmpty()) {
                email.setCC(withCopy);
            }
            email.setSubject(notification.getSubject());
            email.addHTML(body);
            email.setSenderEmail(NotificationDAO.SENDER_EMAIL);
            email.setSenderName(NotificationDAO.SENDER_NAME);
            email.send();
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

}
