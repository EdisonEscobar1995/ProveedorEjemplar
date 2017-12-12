package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.utils.Common;
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

    public String getPublicResource(String idResource) throws HandlerGenericException {
        String response = "";
        try {
            String host = Common.getHostName();
            View vwSystem = getDatabase().getView("vwSystems");
            Document docSystem = vwSystem.getFirstDocumentByKey("frSystem", true);
            String filesPathApplication = docSystem.getItemValueString("filesPathApplication");

            if (null == filesPathApplication || filesPathApplication.isEmpty()) {
                throw new HandlerGenericException("FILES_PATH_APPLICATION_NOT_FOUND");
            }

            Database filesDatabase = getSession().getDatabase(filesPathApplication);
            View vwFiles = filesDatabase.getView("vwProgIds");
            Document docFiles = vwFiles.getFirstDocumentByKey(idResource, true);

            if (null != docFiles) {
                // TODO eliminar puerto
                response = host + "/" + filesPathApplication + "/0/" + docFiles.getUniversalID() + "/$FILE" + "/"
                        + getFileName(docFiles);
            }

        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    private String getFileName(Document document) {
        return (String) getSession().evaluate("@AttachmentNames", document).elementAt(0);
    }

}
