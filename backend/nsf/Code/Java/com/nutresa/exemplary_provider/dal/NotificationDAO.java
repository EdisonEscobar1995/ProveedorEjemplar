package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class NotificationDAO extends GenericDAO<NotificationDTO> {

    public NotificationDAO() {
        super(NotificationDTO.class);
    }

    public NotificationDTO getNotificationByAlias(String alias) throws HandlerGenericException {
        NotificationDTO response = null;
        try {
            View currentView = getDatabase().getView("vwNotificationByAlias");
            Document document = currentView.getFirstDocumentByKey(alias);
            response = castDocument(document);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }
}
