package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openntf.domino.email.DominoEmail;

import com.nutresa.exemplary_provider.bll.TranslationBLO.Dictionary;
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
            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/modifiedSuppliers";
            notification.setMessage(notification.getMessage());
            sendNotification(sendTo, notification, false, null, true, linkOfButton);
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
            notification.setMessage(notification.getMessage());
            sendNotification(sendTo, notification, true, buildDetailUserCompletedSurvey(idSupplier), false, null);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    private Map<String, String> buildDetailUserCompletedSurvey(String idSupplier) throws HandlerGenericException {
        Dictionary dictionary = TranslationBLO.getInstance().getDictionary("Notifications");
        SupplierBLO supplierBLO = new SupplierBLO();
        SupplierDTO supplier = supplierBLO.get(idSupplier);
        SupplyBLO supplyBLO = new SupplyBLO();
        SupplyDTO supply = supplyBLO.get(supplier.getIdSupply());
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        CompanySizeDTO companySize = companySizeBLO.get(supplier.getIdCompanySize());
        Map<String, String> detail = new HashMap<String, String>();
        detail.put(dictionary.get("COMPANY_SIZE"), companySize.getName());
        detail.put(dictionary.get("SUPPLY"), supply.getName());
        detail.put(dictionary.get("SUPPLIER"), supplier.getBusinessName());
        return detail;
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
    private void sendNotification(List<String> sendTo, NotificationDTO notification, boolean requireTableDetail,
            Map<String, String> dataDetail, boolean requireButton, String linkButton) throws HandlerGenericException {
        NotificationDAO notificationDAO = new NotificationDAO();
        try {
            StringBuilder body = new StringBuilder();
            DominoEmail email = new DominoEmail();
            body.append(TemplateMail.buildMessage(notification.getMessage(), requireTableDetail, dataDetail,
                    requireButton, linkButton, notificationDAO.getPublicResource(notification.getIdBanner()),
                            notificationDAO.getPublicResource(notification.getIdFooter())));
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

    public void notifyToSupplierForContinue(String email) throws HandlerGenericException {
        try {
            List<String> emails = new ArrayList<String>();
            emails.add(email);
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("SUPPLIER_CALLED_BY_LIBERATOR");
            notification.setMessage(notification.getMessage());
            String linkOfButton = Common.buildPathResource() + "/dist/index.html";
            sendNotification(emails, notification, false, null, true, linkOfButton);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

    public void sendInvitation(SupplierDTO supplier) throws HandlerGenericException {
        SupplierBLO supplierBLO = new SupplierBLO();
        Map<String, String> informationInOtherDataBase = supplierBLO.getInformationInOtherDataBase(supplier);
        if (!informationInOtherDataBase.isEmpty()) {
            Dictionary dictionary = TranslationBLO.getInstance().getDictionary("Notification");
            Map<String, String> detail = new HashMap<String, String>();
            detail.put(dictionary.get("USER"), informationInOtherDataBase.get("userName"));
            detail.put(dictionary.get("PASSWORD"), informationInOtherDataBase.get("password"));
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("SUPPLIER_CALLED_BY_LIBERATOR");
            notification.setMessage(notification.getMessage());
            String linkOfButton = Common.buildPathResource() + "/dist/index.html";
            sendNotification(supplier.getEmails(), notification, true, detail, true, linkOfButton);
        }
    }

}
