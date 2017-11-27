package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import org.openntf.domino.email.DominoEmail;

import com.nutresa.exemplary_provider.dal.NotificationDAO;
import com.nutresa.exemplary_provider.dtl.CompanySizeDTO;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.dtl.RolDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SupplyDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.Common;
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
            String pathApplication = Common.buildPathResource() + "/dist/index.html#/modifiedSuppliers";
            notification.setMessage(notification.getMessage().concat(
                    "<a href='" + pathApplication + "'>Link de consulta</a>"));
            sendNotification(sendTo, notification);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    public void notifySurveyCompleted(String idSupplier) throws HandlerGenericException {
        try {
            List<String> sendTo = new ArrayList<String>();
            List<UserDTO> users = getUsersByRolName("LIBERATOR");
            users.addAll(getUsersByRolName("EVALUATOR"));
            for (UserDTO user : users) {
                sendTo.add(user.getEmail());
            }
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("SURVEY_ENDED_BY_SUPPLIER");
            notification.setMessage(notification.getMessage().concat(buildDetailUserCompletedSurvey(idSupplier)));
            sendNotification(sendTo, notification);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    private String buildDetailUserCompletedSurvey(String idSupplier) throws HandlerGenericException {
        String detail = "<table><tr><th>Proveedor</th><th>Suministro</th><th>Tamaño de empresa</th></tr><tr><td>%s</td><td>%s</td><td>%s</td></tr></table>";
        SupplierBLO supplierBLO = new SupplierBLO();
        SupplierDTO supplier = supplierBLO.get(idSupplier);
        SupplyBLO supplyBLO = new SupplyBLO();
        SupplyDTO supply = supplyBLO.get(supplier.getIdSupply());
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        CompanySizeDTO companySize = companySizeBLO.get(supplier.getIdCompanySize());
        return String.format(detail, supplier.getBusinessName(), supply.getName(), companySize.getName());
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

    public void notifyToSupplierForContinue(List<String> email) throws HandlerGenericException {
        try {
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("SUPPLIER_CALLED_BY_LIBERATOR");
            String pathApplication = Common.buildPathResource() + "/dist/index.html";
            notification.setMessage(notification.getMessage().concat(
                    "<a href='" + pathApplication + "'>Continuar encuesta</a>"));
            sendNotification(email, notification);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

    public void notifyToContact(String idSupplier) throws HandlerGenericException {
        SupplierBLO supplierBLO = new SupplierBLO();
        List<String> email = new Vector<String>();
        SupplierDTO supplier = supplierBLO.get(idSupplier);
        email.add(supplier.getEmailContactPersonInGroupNutresa());
        NotificationDAO notificationDAO = new NotificationDAO();
        NotificationDTO notification = notificationDAO.getNotificationByAlias("SURVEY_ENDED_BY_SUPPLIER");
        sendNotification(email, notification);
    }

    public void sendInvitation(List<String> emails) throws HandlerGenericException {
        NotificationDAO notificationDAO = new NotificationDAO();
        NotificationDTO notification = notificationDAO.getNotificationByAlias("SUPPLIER_CALLED_BY_LIBERATOR");
        sendNotification(emails, notification);
    }

}
