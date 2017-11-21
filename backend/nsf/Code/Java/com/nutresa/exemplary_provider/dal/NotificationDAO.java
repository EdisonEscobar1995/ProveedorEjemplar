package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class NotificationDAO extends GenericDAO<NotificationDTO> {
    public static final String SENDER_NAME = "Portal de proveedores";
    public static final String SENDER_EMAIL = "gruponutresa@nutresa.com";

    public NotificationDAO() {
        super(NotificationDTO.class);
    }

    public NotificationDTO getNotificationByAlias(String alias) throws HandlerGenericException {
        NotificationDTO response = null;
        try {
            View currentView = getDatabase().getView("vwNotificationsByAlias");
            Document document = currentView.getFirstDocumentByKey(alias, true);
            response = castDocument(document);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }
}
