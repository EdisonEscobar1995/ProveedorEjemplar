package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.openntf.domino.email.DominoEmail;
import org.openntf.domino.utils.Factory.SessionType;

import org.openntf.domino.utils.Factory;
import com.nutresa.exemplary_provider.bll.TranslationBLO.Dictionary;
import com.nutresa.exemplary_provider.dal.NotificationDAO;
import com.nutresa.exemplary_provider.dtl.CompanySizeDTO;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.dtl.RolDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
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

    public void notifyChangeCompanySize(String idSupplier) throws HandlerGenericException {
        String oldCampanySize = "";
        Dictionary dictionary = TranslationBLO.getInstance().getDictionary("Notification");
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        try {
            List<String> sendTo = new ArrayList<String>();
            List<UserDTO> users = getUsersByRolName("LIBERATOR");
            for (UserDTO user : users) {
                sendTo.add(user.getEmail());
            }

            Map<String, String> detailUserToSend = buildDetailUserToSend(idSupplier);
            SupplierByCallDTO supplierByCall = supplierByCallBLO.getSupplierByCallActiveBySupplier(idSupplier);

            if (null != supplierByCall && !supplierByCall.getOldIdCompanySize().isEmpty()) {
                oldCampanySize = companySizeBLO.get(supplierByCall.getOldIdCompanySize()).getName();
            }

            detailUserToSend.put(dictionary.get("NEW_COMPANY_SIZE"), detailUserToSend.remove(dictionary
                    .get("COMPANY_SIZE")));
            detailUserToSend.put(dictionary.get("OLD_COMPANY_SIZE"), oldCampanySize);

            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("CHANGE_COMPANY_SIZE");
            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/modifiedSuppliers";
            notification.setMessage(notification.getMessage());
            sendNotification(sendTo, notification, true, detailUserToSend, true, linkOfButton);
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
            sendNotification(sendTo, notification, true, buildDetailUserToSend(idSupplier), false, null);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    private Map<String, String> buildDetailUserToSend(String idSupplier) throws HandlerGenericException {
        Dictionary dictionary = TranslationBLO.getInstance().getDictionary("Notification");
        SupplierBLO supplierBLO = new SupplierBLO();
        SupplierDTO supplier = supplierBLO.get(idSupplier);
        SupplyBLO supplyBLO = new SupplyBLO();
        SupplyDTO supply = supplyBLO.get(supplier.getIdSupply());
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        CompanySizeDTO companySize = companySizeBLO.get(supplier.getIdCompanySize());
        Map<String, String> detail = new LinkedHashMap<String, String>();
        detail.put(dictionary.get("SUPPLIER"), supplier.getBusinessName());
        detail.put(dictionary.get("SUPPLY"), supply.getName());
        detail.put(dictionary.get("COMPANY_SIZE"), companySize.getName());
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

    private void sendNotification(List<String> sendTo, NotificationDTO notification, boolean requireTableDetail,
            Map<String, String> dataDetail, boolean requireButton, String linkButton) throws HandlerGenericException {
        NotificationDAO notificationDAO = new NotificationDAO();
        try {
            StringBuilder body = new StringBuilder();
            DominoEmail email = new DominoEmail(Factory.getSession(SessionType.NATIVE));
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

    public void notifyToSupplierForContinue(SupplierDTO supplier) throws HandlerGenericException {
        try {
            SupplierBLO supplierBLO = new SupplierBLO();
            List<String> emails = new ArrayList<String>();
            emails.add(supplier.getEmailOfContact());
            
            Map<String, String> informationInOtherDataBase = supplierBLO.getInformationInOtherDataBase(supplier);
            Dictionary dictionary = TranslationBLO.getInstance().getDictionary("Notification");
            Map<String, String> detail = new LinkedHashMap<String, String>();
            detail.put(dictionary.get("USER"), informationInOtherDataBase.get("userName"));
            detail.put(dictionary.get("PASSWORD"), informationInOtherDataBase.get("password"));
            
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("CHANGE_COMPANY_SIZE_CONFIRMED");
            notification.setMessage(notification.getMessage());
            
            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/supplier";
            sendNotification(emails, notification, true, detail, true, linkOfButton);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

    public void sendInvitation(SupplierDTO supplier) throws HandlerGenericException {
        SupplierBLO supplierBLO = new SupplierBLO();
        Map<String, String> informationInOtherDataBase = supplierBLO.getInformationInOtherDataBase(supplier);
        if (!informationInOtherDataBase.isEmpty()) {
            Dictionary dictionary = TranslationBLO.getInstance().getDictionary("Notification");
            Map<String, String> detail = new LinkedHashMap<String, String>();
            detail.put(dictionary.get("USER"), informationInOtherDataBase.get("userName"));
            detail.put(dictionary.get("PASSWORD"), informationInOtherDataBase.get("password"));
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("SUPPLIER_CALLED_BY_LIBERATOR");
            notification.setMessage(notification.getMessage());
            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/supplier";
            sendNotification(supplier.getEmails(), notification, true, detail, true, linkOfButton);
        }
    }

}
