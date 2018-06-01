package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;
import com.ibm.xsp.http.fileupload.FileItem;
import com.nutresa.exemplary_provider.dal.AttachmentDAO;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AttachmentBLO {

    public AttachmentDTO save(List<FileItem> items) throws HandlerGenericException {
        AttachmentDAO dao = new AttachmentDAO();
        return dao.save(items);
    }

    public AttachmentDTO get(String id) {
        AttachmentDAO dao = new AttachmentDAO();
        return dao.get(id);
    }

    public boolean delete(String id) {
        AttachmentDAO dao = new AttachmentDAO();
        return dao.delete(id);
    }

    public List<AttachmentDTO> getDocuments(List<String> idDocuements) {
        List<AttachmentDTO> response = new ArrayList<AttachmentDTO>();
        AttachmentDAO attachmentDAO = new AttachmentDAO();
        for (String idDocument : idDocuements) {
            AttachmentDTO document = attachmentDAO.get(idDocument);
            if (null != document && null != document.getId()) {
                response.add(document);
            }
        }

        return response;
    }

    protected void deleteDocuments(List<AttachmentDTO> documents) {
        if (null != documents) {
            for (AttachmentDTO attachment : documents) {
                delete(attachment.getId());
            }
        }
    }

    /**
     * Crea un adjunto en la base de datos publica de anexos
     * 
     * @param String
     *            Documento público
     * @throws HandlerGenericException
     */
    protected void createAttachmentPublic(String idResource) throws HandlerGenericException {
        AttachmentDAO attachmentDAO = new AttachmentDAO();
        attachmentDAO.createAttachmentPublic(idResource);
    }

}
