package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.email.DominoEmail;

import com.nutresa.exemplary_provider.dal.NotificationDAO;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.dtl.RolDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class NotificationBLO extends GenericBLO<NotificationDTO, NotificationDAO> {

    public NotificationBLO() {
        super(NotificationDAO.class);
    }

    public void notifyToLiberator() throws HandlerGenericException {
        try {
            List<String> sendTo = new ArrayList<String>();
            List<UserDTO> users = getUsersLiberators();
            for (UserDTO user : users) {
                sendTo.add(user.getEmail());
            }
            NotificationDAO notificationDAO = new NotificationDAO();
            sendNotification(sendTo, notificationDAO.getNotificationByAlias("CHANGE_COMPANY_SIZE"));
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

    private List<UserDTO> getUsersLiberators() throws HandlerGenericException {
        RolBLO rolBLO = new RolBLO();
        UserBLO userBLO = new UserBLO();
        List<UserDTO> users = new ArrayList<UserDTO>();
        try {
            RolDTO rol = rolBLO.getIdRolLiberator();
            users = userBLO.getUsersByRol(rol.getId());
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return users;
    }

    @SuppressWarnings("deprecation")
    private void sendNotification(List<String> sendTo, NotificationDTO notification) {
        StringBuilder body = new StringBuilder();
        DominoEmail email = new DominoEmail();
        body.append(notification.getMessage());
        email.setTo(sendTo);
        List<String> withCopy = notification.getWithCopy();
        if (withCopy != null && !withCopy.isEmpty()) {
            email.setCC(withCopy);
        }
        email.setSubject(notification.getName());
        email.addHTML(body);
        email.setSenderEmail(notification.SENDER_EMAIL);
        email.setSenderName(notification.SENDER_NAME);
        email.send();
    }

}
