package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.openntf.domino.email.DominoEmail;
import org.openntf.domino.utils.Factory.SessionType;

import org.openntf.domino.utils.Factory;
import com.nutresa.exemplary_provider.dal.NotificationDAO;
import com.nutresa.exemplary_provider.dtl.CompanySizeDTO;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SupplyDTO;
import com.nutresa.exemplary_provider.dtl.NotificationType;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;
import com.nutresa.exemplary_provider.utils.TemplateMail;

public class NotificationBLO extends GenericBLO<NotificationDTO, NotificationDAO> {

    public NotificationBLO() {
        super(NotificationDAO.class);
    }

    public void notifyChangeCompanySize(String idSupplier) throws HandlerGenericException {
        String oldCampanySize = "";
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        try {
            List<String> sendTo = getUsersByRolName(Rol.LIBERATOR.toString());

            Map<String, String> detailUserToSend = buildDetailUserToSend(idSupplier);
            SupplierByCallDTO supplierByCall = supplierByCallBLO.getSupplierByCallActiveBySupplier(idSupplier);

            if (null != supplierByCall && !supplierByCall.getOldIdCompanySize().isEmpty()) {
                oldCampanySize = companySizeBLO.get(supplierByCall.getOldIdCompanySize()).getName();
            }

            detailUserToSend.put("Nuevo tamaño", detailUserToSend.remove("Tamaño de empresa"));
            detailUserToSend.put("Tamaño anterior", oldCampanySize);

            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias(NotificationType.CHANGE_COMPANY_SIZE
                    .toString());
            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/modifiedSuppliers";
            sendNotification(sendTo, notification, true, detailUserToSend, true, linkOfButton);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    /**
     * Notifica a los interesados de cada etapa de la encuesta finalizada. Dado
     * el <code>Rol</code> que complete la fase envía su respectivo mensaje.
     * 
     * @param idSupplier
     *            Identificador del proveedor que fue evaluado en la encuesta.
     * @param rol
     *            Rol que está finalizando la encuesta
     * @throws HandlerGenericException
     */
    public void notifySurveyCompleted(String idSupplier, Rol rol) throws HandlerGenericException {
        NotificationDTO notification = null;
        String linkOfButton = Common.buildPathResource() + "/dist/index.html#/surveys";
        List<String> sendTo = getUsersByRolName(Rol.LIBERATOR.toString());

        NotificationDAO notificationDAO = new NotificationDAO();
        switch (rol) {
        case EVALUATOR:
            notification = notificationDAO
                    .getNotificationByAlias(NotificationType.SURVEY_ENDED_BY_EVALUATOR.toString());
            break;
        case SUPPLIER:
            notification = notificationDAO.getNotificationByAlias(NotificationType.SURVEY_ENDED_BY_SUPPLIER.toString());
            break;
        case TECHNICAL_TEAM:
            notification = notificationDAO.getNotificationByAlias(NotificationType.SURVEY_ENDED_BY_TECHNICAL_TEAM
                    .toString());
            break;
        default:
            notification = new NotificationDTO();
            break;
        }

        sendNotification(sendTo, notification, true, buildDetailUserToSend(idSupplier), true, linkOfButton);
    }

    private Map<String, String> buildDetailUserToSend(String idSupplier) throws HandlerGenericException {
        SupplierBLO supplierBLO = new SupplierBLO();
        SupplierDTO supplier = supplierBLO.get(idSupplier);
        SupplyBLO supplyBLO = new SupplyBLO();
        SupplyDTO supply = supplyBLO.get(supplier.getIdSupply());
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        CompanySizeDTO companySize = companySizeBLO.get(supplier.getIdCompanySize());
        Map<String, String> detail = new LinkedHashMap<String, String>();
        detail.put("Proveedor", supplier.getBusinessName());
        detail.put("Suministro", supply.getName());
        detail.put("Tamaño de empresa", companySize.getName());
        return detail;
    }

    private List<String> getUsersByRolName(String nameRol) throws HandlerGenericException {
        UserBLO userBLO = new UserBLO();
        return userBLO.getUserEmailsByRol(nameRol);
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
            Map<String, String> detail = new LinkedHashMap<String, String>();
            detail.put("Usuario", informationInOtherDataBase.get("userName"));
            detail.put("Contraseña", informationInOtherDataBase.get("password"));

            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO
                    .getNotificationByAlias(NotificationType.CHANGE_COMPANY_SIZE_CONFIRMED.toString());

            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/supplier";
            sendNotification(emails, notification, true, detail, true, linkOfButton);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

    public void sendNotificationTypeToSupplier(SupplierDTO supplier, NotificationType notificationType)
            throws HandlerGenericException {
        SupplierBLO supplierBLO = new SupplierBLO();
        Map<String, String> informationInOtherDataBase = supplierBLO.getInformationInOtherDataBase(supplier);
        if (!informationInOtherDataBase.isEmpty()) {
            Map<String, String> detail = new LinkedHashMap<String, String>();
            detail.put("Usuario", informationInOtherDataBase.get("userName"));
            detail.put("Contraseña", informationInOtherDataBase.get("password"));
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias(notificationType.toString());
            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/supplier";
            sendNotification(supplier.getEmails(), notification, true, detail, true, linkOfButton);
        }
    }

    public void notifyToTechnicalTeam(List<String> emails) throws HandlerGenericException {
        try {
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO
                    .getNotificationByAlias(NotificationType.TECHNICAL_TEAM_CALLED_BY_LIBERATOR.toString());

            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/technicalTeam";
            sendNotification(emails, notification, false, null, true, linkOfButton);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

}
