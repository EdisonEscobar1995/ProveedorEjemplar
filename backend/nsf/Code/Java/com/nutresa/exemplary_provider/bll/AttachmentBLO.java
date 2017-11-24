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
            response.add(attachmentDAO.get(idDocument));
        }
        return response;
    }

}
