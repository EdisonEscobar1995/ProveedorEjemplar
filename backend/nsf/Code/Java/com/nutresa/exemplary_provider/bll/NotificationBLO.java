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
import com.nutresa.exemplary_provider.dtl.RolDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SupplyDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
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
            List<String> sendTo = new ArrayList<String>();
            List<UserDTO> users = getUsersByRolName(Rol.LIBERATOR.toString());
            for (UserDTO user : users) {
                sendTo.add(user.getEmail());
            }

            Map<String, String> detailUserToSend = buildDetailUserToSend(idSupplier);
            SupplierByCallDTO supplierByCall = supplierByCallBLO.getSupplierByCallActiveBySupplier(idSupplier);

            if (null != supplierByCall && !supplierByCall.getOldIdCompanySize().isEmpty()) {
                oldCampanySize = companySizeBLO.get(supplierByCall.getOldIdCompanySize()).getName();
            }

            detailUserToSend.put("Nuevo tamaño", detailUserToSend.remove("Tamaño de empresa"));
            detailUserToSend.put("Tamaño anterior", oldCampanySize);

            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("CHANGE_COMPANY_SIZE");
            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/modifiedSuppliers";
            sendNotification(sendTo, notification, true, detailUserToSend, true, linkOfButton);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    /**
     * Notifica a los interesados de cada etapa de la encuesta finalizada. Dado el <code>Rol</code> que complete la fase
     * envía su respectivo mensaje.
     * @param idSupplier Identificador del proveedor que fue evaluado en la encuesta.
     * @param rol Rol que está finalizando la encuesta
     * @throws HandlerGenericException
     */
    public void notifySurveyCompleted(String idSupplier, Rol rol) throws HandlerGenericException {
        try {
            NotificationDTO notification = null;
            List<String> sendTo = new ArrayList<String>();
            List<UserDTO> users = getUsersByRolName(Rol.LIBERATOR.toString());
            for (UserDTO user : users) {
                sendTo.add(user.getEmail());
            }

            NotificationDAO notificationDAO = new NotificationDAO();
            switch (rol) {
            case EVALUATOR:
                notification = notificationDAO.getNotificationByAlias("SURVEY_ENDED_BY_EVALUATOR");
                break;
            case SUPPLIER:
                users.addAll(getUsersByRolName(Rol.EVALUATOR.toString()));
                for (UserDTO user : users) {
                    sendTo.add(user.getEmail());
                }
                notification = notificationDAO.getNotificationByAlias("SURVEY_ENDED_BY_SUPPLIER");
                break;
            default:
                notification = new NotificationDTO();
                break;
            }

            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/surveys";
            sendNotification(sendTo, notification, true, buildDetailUserToSend(idSupplier), true, linkOfButton);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
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
            Map<String, String> detail = new LinkedHashMap<String, String>();
            detail.put("Usuario", informationInOtherDataBase.get("userName"));
            detail.put("Contraseña", informationInOtherDataBase.get("password"));

            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("CHANGE_COMPANY_SIZE_CONFIRMED");

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
            Map<String, String> detail = new LinkedHashMap<String, String>();
            detail.put("Usuario", informationInOtherDataBase.get("userName"));
            detail.put("Contraseña", informationInOtherDataBase.get("password"));
            NotificationDAO notificationDAO = new NotificationDAO();
            NotificationDTO notification = notificationDAO.getNotificationByAlias("SUPPLIER_CALLED_BY_LIBERATOR");
            String linkOfButton = Common.buildPathResource() + "/dist/index.html#/supplier";
            sendNotification(supplier.getEmails(), notification, true, detail, true, linkOfButton);
        }
    }

}
