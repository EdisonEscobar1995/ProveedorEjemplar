package com.nutresa.exemplary_provider.dal;

import java.util.List;

import org.openntf.domino.utils.Factory;
import org.openntf.domino.Session;
import org.openntf.domino.Database;
import org.openntf.domino.View;
import org.openntf.domino.Document;
import org.openntf.domino.MIMEEntity;
import org.openntf.domino.MIMEHeader;
import org.openntf.domino.Stream;

import com.ibm.xsp.http.fileupload.FileItem;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AttachmentDAO {

    private Session session;
    private Database database;
    private String entityView;

    public AttachmentDAO() {
        this.session = Factory.getSession();
        this.database = session.getCurrentDatabase();
        this.entityView = "vwAttachments";
    }

    public AttachmentDTO save(List<FileItem> items) throws HandlerGenericException {

        Document document = this.database.createDocument();

        MIMEEntity mime = document.createMIMEEntity("files");

        for (FileItem item : items) {
            if (item.isFormField()) {
                document.replaceItemValue(item.getFieldName(), item.getString());
                if ("isNotification".equals(item.getFieldName()) && "YES".equals(item.getString())) {
                    createPublicResouce(items);
                }
            } else {
                processUploadedFile(item, mime);
            }
        }

        document.replaceItemValue("form", "frAttachment");
        document.replaceItemValue("id", document.getUniversalID());

        document.save();

        return castDocument(document);
    }

    private AttachmentDTO createPublicResouce(List<FileItem> items) throws HandlerGenericException {
        View vwSystem = this.database.getView("vwSystems");
        Document docSystem = vwSystem.getFirstDocumentByKey("frSystem", true);
        Database publicDataBase = this.session.getDatabase(docSystem.getItemValueString("filespathapplication"));
        Document publicDocument = publicDataBase.createDocument();

        MIMEEntity mime = publicDocument.createMIMEEntity("files");

        for (FileItem item : items) {
            if (item.isFormField()) {
                publicDocument.replaceItemValue(item.getFieldName(), item.getString());
            } else {
                processUploadedFile(item, mime);
            }
        }

        publicDocument.replaceItemValue("form", "frAnexo");
        publicDocument.replaceItemValue("id", publicDocument.getUniversalID());

        publicDocument.save();
        return castDocument(publicDocument);
    }

    public AttachmentDTO get(String id) {
        return castDocument(getDocument(id));
    }

    public boolean delete(String id) {
        Document document = getDocument(id);
        return document.remove(true);
    }

    private Document getDocument(String id) {
        View view = this.database.getView(entityView);
        return view.getFirstDocumentByKey(id, true);
    }

    private AttachmentDTO castDocument(Document document) {
        AttachmentDTO dto = new AttachmentDTO();
        if (null != document) {
            dto.setId(document.getItemValueString("id"));
            dto.setUrl(getAttachmentUrl(document));
            dto.setName(getFileName(document));
        }
        return dto;
    }

    private String getAttachmentUrl(Document document) {
        String url = Common.buildPathResource();
        url += "/" + entityView + "/" + document.getUniversalID() + "/$FILE" + "/" + getUrlEncode(document);

        return url;
    }

    private String getUrlEncode(Document document) {
        return (String) session.evaluate("@URLEncode('Domino';@AttachmentNames)", document).elementAt(0);
    }

    private String getFileName(Document document) {
        return (String) session.evaluate("@AttachmentNames", document).elementAt(0);
    }

    private void processUploadedFile(FileItem item, MIMEEntity mime) throws HandlerGenericException {
        try {
            MIMEEntity child = mime.createChildEntity();

            MIMEHeader header = child.createHeader("content-disposition");
            header.setHeaderVal("attachment;filename=\"" + item.getName() + "\"");

            Stream stream = this.session.createStream();
            stream.write(item.get());

            child.setContentFromBytes(stream, item.getContentType(), MIMEEntity.ENC_IDENTITY_BINARY);
            child.decodeContent();

        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

    /**
     * Crea un adjunto en la base de datos publica de anexos
     * 
     * @param publicAttachment
     *            Documento público
     * @throws HandlerGenericException
     */
    public void createAttachmentPublic(String idResource) throws HandlerGenericException {
        try {
            View vwSystem = database.getView("vwSystems");
            Document docSystem = vwSystem.getFirstDocumentByKey("frSystem", true);
            String filesPathApplication = docSystem.getItemValueString("filesPathApplication");

            if (null == filesPathApplication || filesPathApplication.isEmpty()) {
                throw new HandlerGenericException("FILES_PATH_APPLICATION_NOT_FOUND");
            }

            Database publicDataBase = session.getDatabase(filesPathApplication);
            Document document = publicDataBase.createDocument();
            document = this.getDocument(idResource);

            if (!document.save(true, false)) {
                throw new HandlerGenericException("Cant create document");
            }

        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

    }

}
