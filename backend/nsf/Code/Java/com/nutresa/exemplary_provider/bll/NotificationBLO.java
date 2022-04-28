package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.NotificationDAO;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
import com.nutresa.exemplary_provider.dtl.CompanySizeDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SupplyDTO;
import com.nutresa.exemplary_provider.dtl.NotificationType;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class NotificationBLO extends GenericBLO<NotificationDTO, NotificationDAO> {

    public NotificationBLO() {
        super(NotificationDAO.class);
    }

    @Override
    public NotificationDTO save(NotificationDTO notification) throws HandlerGenericException {
        NotificationDTO notificationSaved = super.save(notification);
        AttachmentBLO attachmentBLO = new AttachmentBLO();
        AttachmentDTO attachmentBanner = attachmentBLO.get(notification.getIdBanner());
        attachmentBLO.createAttachmentToPublicDataBase(attachmentBanner.getId());
        AttachmentDTO attachmentFooter = attachmentBLO.get(notification.getIdFooter());
        attachmentBLO.createAttachmentToPublicDataBase(attachmentFooter.getId());
        return notificationSaved;
    }

    public void notifyChangeCompanySize(String idSupplier) throws HandlerGenericException {
        String oldCampanySize = "";
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        try {
            UserBLO userBLO = new UserBLO();
            List<String> sendTo = userBLO.getUserEmailsByRol(Rol.LIBERATOR.toString());

            Map<String, String> detailUserToSend = buildDetailUserToSend(idSupplier);
            SupplierByCallDTO supplierByCall = supplierByCallBLO.getSupplierByCallActiveBySupplier(idSupplier);

            if (null != supplierByCall && !supplierByCall.getOldIdCompanySize().isEmpty()) {
                oldCampanySize = companySizeBLO.get(supplierByCall.getOldIdCompanySize()).getName();
            }

            detailUserToSend.put("Nuevo tama駉", detailUserToSend.remove("Tama駉 de empresa"));
            detailUserToSend.put("Tama駉 anterior", oldCampanySize);

            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias(NotificationType.CHANGE_COMPANY_SIZE
                    .toString());

            if (null != notification.getWithCopy() && !notification.getWithCopy().isEmpty()) {
                sendTo.addAll(notification.getWithCopy());
            }

            String linkOfButton = buildLinkModifiedSupplier();
            notificationDAO.sendNotification(sendTo, notification, true, detailUserToSend, true, linkOfButton);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    /**
     * Notifica a los interesados de cada etapa de la encuesta finalizada. Dado
     * el <code>Rol</code> que complete la fase env铆a su respectivo mensaje.
     * 
     * @param idSupplier
     *            Identificador del proveedor que fue evaluado en la encuesta.
     * @param rol
     *            Rol que est谩 finalizando la encuesta
     * @throws HandlerGenericException
     */
    public void notifySurveyCompleted(String idSupplier, Rol rol) throws HandlerGenericException {
        NotificationDTO notification = null;
        String linkOfButton = buildLinkSurvey();
        UserBLO userBLO = new UserBLO();
        List<String> sendTo = userBLO.getUserEmailsByRol(Rol.LIBERATOR.toString());

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

        if (null != notification.getWithCopy() && !notification.getWithCopy().isEmpty()) {
            sendTo.addAll(notification.getWithCopy());
        }

        notificationDAO.sendNotification(sendTo, notification, true, buildDetailUserToSend(idSupplier), true, linkOfButton);
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
        detail.put("Tama駉 de empresa", companySize.getName());
        return detail;
    }

    public void notifyToSupplierForContinue(SupplierDTO supplier) throws HandlerGenericException {
        try {
            List<String> emails = new ArrayList<String>();
            emails.add(supplier.getEmailOfContact());

            SupplierBLO supplierBLO = new SupplierBLO();
            Map<String, String> detail = supplierBLO.getUserAndPassword(supplier);

            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO
                    .getNotificationByAlias(NotificationType.CHANGE_COMPANY_SIZE_CONFIRMED.toString());

            if (null != notification.getWithCopy() && !notification.getWithCopy().isEmpty()) {
                emails.addAll(notification.getWithCopy());
            }

            String linkOfButton = buildLinkSupplier();
            notificationDAO.sendNotification(emails, notification, true, detail, true, linkOfButton);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

    public void sendNotificationTypeToSupplier(SupplierDTO supplier, NotificationType notificationType)
            throws HandlerGenericException {
        SupplierBLO supplierBLO = new SupplierBLO();
        Map<String, String> informationInOtherDataBase = supplierBLO.getInformationInOtherDataBase(supplier);
        if (!informationInOtherDataBase.isEmpty()) {
            List<String> emails = new ArrayList<String>();

            if (notificationType.equals(NotificationType.SUPPLIER_DISCARDED)
            		|| notificationType.equals(NotificationType.SUPPLIER_CALLED_BY_EVALUATOR)
                    || notificationType.equals(NotificationType.SUPPLIER_CALLED_BY_TECHNICAL_TEAM)
                    || notificationType.equals(NotificationType.SUPPLIER_CALLED_BY_MANAGER_TEAM)
                    || notificationType.equals(NotificationType.SURVEY_FINISHED_BY_SUPPLIER)) {
                emails.add(supplier.getEmailOfContact());
            } else {
                emails = supplier.getEmails();
            }

            Map<String, String> detail = new LinkedHashMap<String, String>();
            detail.put("Usuario", informationInOtherDataBase.get("userName"));
            detail.put("Contrase馻", informationInOtherDataBase.get("password"));
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias(notificationType.toString());

            if (null != notification.getWithCopy() && !notification.getWithCopy().isEmpty()) {
                emails.addAll(notification.getWithCopy());
            }
            
            boolean requireButton = true;
            /*if (notificationType.equals(NotificationType.SUPPLIER_CALLED_BY_EVALUATOR)) {
            	requireButton = false;
            }*/

            String linkOfButton = buildLinkSupplier();
            notificationDAO.sendNotification(emails, notification, true, detail, requireButton, linkOfButton);
        }
    }

    public void notifyToTechnicalTeam(List<String> emails) throws HandlerGenericException {
        try {
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO
                    .getNotificationByAlias(NotificationType.TECHNICAL_TEAM_CALLED_BY_LIBERATOR.toString());

            if (null != notification) {
            	if (null != notification.getWithCopy() && !notification.getWithCopy().isEmpty()) {
                    emails.addAll(notification.getWithCopy());
                }

                String linkOfButton = buildLinkTechnicalTeam();
                notificationDAO.sendNotification(emails, notification, false, null, true, linkOfButton);
            }
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

    public void notifyToManagerTeam(List<String> emails) throws HandlerGenericException {
        try {
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO
                    .getNotificationByAlias(NotificationType.MANAGER_TEAM_CALLED_BY_LIBERATOR.toString());

            if (null != notification.getWithCopy() && !notification.getWithCopy().isEmpty()) {
                emails.addAll(notification.getWithCopy());
            }

            String linkOfButton = buildLinkManagerTeam();
            notificationDAO.sendNotification(emails, notification, false, null, true, linkOfButton);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

    }

    /**
     * Envia notificaci贸n a los detinatarios especificados. Si
     * <code>detail</code> tiene contenido entonces envia informaci贸n adicional
     * 
     * @param sendTo
     *            Direcciones de correo a donde se enviar谩 la notificaci贸n
     * @param notification
     *            Notificaci贸n a enviar
     * @param linkButton
     *            Link de acceso directo
     * @param detail
     *            Informaci贸n adicional a enviar en la notificaci贸n
     * @throws HandlerGenericException
     */
    protected void sendAlarm(List<String> sendTo, NotificationDTO notification, String linkButton,
            Map<String, String> detail) throws HandlerGenericException {
    	NotificationDAO notificationDAO = new NotificationDAO();
        if (detail.containsKey("Usuario")) {
        	notificationDAO.sendNotification(sendTo, notification, true, detail, true, linkButton);
        } else {
        	notificationDAO.sendNotification(sendTo, notification, false, detail, true, linkButton);
        }
    }

    public List<NotificationDTO> getAllNotification() throws HandlerGenericException {
        List<NotificationDTO> notifications = new ArrayList<NotificationDTO>();
        List<DTO> temporalNotifications = super.getAll();
        for (DTO notification : temporalNotifications) {
            NotificationDTO originalNotification = (NotificationDTO) notification;
            AttachmentBLO attachmentBLO = new AttachmentBLO();
            originalNotification.setBanner(attachmentBLO.get(originalNotification.getIdBanner()));
            originalNotification.setFooter(attachmentBLO.get(originalNotification.getIdFooter()));
            notifications.add(originalNotification);
        }
        return notifications;
    }

    protected String buildLinkModifiedSupplier() {
        return buildLink("modifiedSuppliers");
    }

    protected String buildLinkSupplier() {
        return buildLink("supplier");
    }

    protected String buildLinkSurvey() {
        return buildLink("surveys");
    }

    protected String buildLinkTechnicalTeam() {
        return buildLink("technicalTeamSurvey");
    }

    protected String buildLinkManagerTeam() {
        return buildLink("managerTeamSurvey");
    }
    
    protected String buildLink(String page) {
    	return Common.buildPathResource() + "/redirect?Open&url="+page+"/?login";
    }

}
