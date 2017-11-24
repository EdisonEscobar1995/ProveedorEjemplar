package com.nutresa.exemplary_provider.bll;

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
	
	public AttachmentDTO get(String id){
		AttachmentDAO dao = new AttachmentDAO();
		return dao.get(id);
	}
	
	public boolean delete(String id){
		AttachmentDAO dao = new AttachmentDAO();
		return dao.delete(id);
	}
	
}
