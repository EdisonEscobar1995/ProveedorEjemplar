package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class NotificationDAO extends GenericDAO<NotificationDTO> {
    public static final String SENDER_NAME = "Proveedor Ejemplar Grupo Nutresa";
    public static final String SENDER_EMAIL = "proveedorejemplar@serviciosnutresa.com";
    public static final String SIGNER_EMAIL = "aaplica@serviciosnutresa.com";

    public NotificationDAO() {
        super(NotificationDTO.class);
    }

    public NotificationDTO getNotificationByAlias(String alias) throws HandlerGenericException {
        try {
            View currentView = getDatabase().getView("vwNotificationsByAlias");
            Document document = currentView.getFirstDocumentByKey(alias, true);
            return castDocument(document);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

    public String getPublicResource(String idResource) throws HandlerGenericException {
        try {
            String response = "";
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
                response = host + "/" + filesPathApplication + "/0/" + docFiles.getUniversalID() + "/$FILE" + "/"
                        + getFileName(docFiles);
            }

            return response;
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

    private String getFileName(Document document) {
        return (String) getSession().evaluate("@AttachmentNames", document).elementAt(0);
    }

}
