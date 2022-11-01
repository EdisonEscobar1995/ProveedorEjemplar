package com.nutresa.exemplary_provider.dal;

import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.ibm.xsp.extlib.util.ExtLibUtil;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;
import com.nutresa.exemplary_provider.utils.TemplateMail;

public class NotificationDAO extends GenericDAO<NotificationDTO> {
    public static final String SENDER_NAME = "Proveedor Ejemplar Grupo Nutresa <aaplicaciones@serviciosnutresa.com@GNCH>";
 
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
    
    public void sendNotification(List<String> sendTo, NotificationDTO notification, boolean requireTableDetail,
            Map<String, String> dataDetail, boolean requireButton, String linkButton) throws HandlerGenericException {
    	try {
    		lotus.domino.Session session = ExtLibUtil.getCurrentSession();
    		session.setConvertMime(false);
			lotus.domino.Stream stream = session.createStream();
	    	lotus.domino.Database db = session.getCurrentDatabase();
			lotus.domino.Document doc = db.createDocument();
			 
			doc.replaceItemValue("form", "Memo");
			lotus.domino.MIMEEntity mime = doc.createMIMEEntity();
			doc.replaceItemValue("Subject", notification.getSubject());
			doc.replaceItemValue("Principal", NotificationDAO.SENDER_NAME);
			doc.replaceItemValue("AltFrom", NotificationDAO.SENDER_NAME);
			doc.replaceItemValue("DisplaySent", NotificationDAO.SENDER_NAME);
			doc.replaceItemValue("DisplaySent2", NotificationDAO.SENDER_NAME);
			doc.replaceItemValue("DisplaySent_1", NotificationDAO.SENDER_NAME);
			doc.replaceItemValue("DisplaySent_1_1", NotificationDAO.SENDER_NAME);
			
			List<String> withCopy = notification.getWithCopy();
			if (withCopy != null && !withCopy.isEmpty()) {
				doc.replaceItemValue("CopyTo", withCopy);
			}
			
			StringBuilder body = new StringBuilder();
			body.append(TemplateMail.buildMessage(notification.getMessage(), requireTableDetail, dataDetail,
                    requireButton, linkButton, getPublicResource(notification.getIdBanner()),
                    getPublicResource(notification.getIdFooter())));
              
			stream.writeText(body.toString());
			
			mime.setContentFromText(stream, "text/html;charset=iso-8859-1", 1725);
		
			Vector<String> vector = new Vector<String>();
		    vector.addAll(sendTo);   
			doc.send(false, vector);
			session.setConvertMime(true);
    	} catch (Exception exception) {
            System.out.println("Error al enviar notificacion proveedor ejemplar = " + exception.toString());
        }
   	}

}
