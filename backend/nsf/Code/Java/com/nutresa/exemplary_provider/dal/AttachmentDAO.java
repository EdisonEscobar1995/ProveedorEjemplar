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
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AttachmentDAO {

	private Session session;
	private Database database;
	
	public AttachmentDAO(){
		this.session = Factory.getSession();
		this.database = session.getCurrentDatabase();
	}

	public AttachmentDTO save(List<FileItem> items)
			throws HandlerGenericException {
		
		Document document = this.database.createDocument();

		MIMEEntity mime = document.createMIMEEntity("files");

		for (FileItem item : items) {
			if (item.isFormField()) {
				document
						.replaceItemValue(item.getFieldName(), item.getString());
			} else {
				processUploadedFile(item, mime);
			}
		}

		document.replaceItemValue("form", "frAttachment");
		document.replaceItemValue("id", document.getUniversalID());

		document.save();

		return castDocument(document);
	}
	
	public AttachmentDTO get(String id){
		return castDocument(getDocument(id));
	}
	
	public boolean delete(String id){
		Document document = getDocument(id);
		return document.remove(true);
	}
	
	private Document getDocument(String id){
		View view = this.database.getView("vwAttachments");
		return view.getFirstDocumentByKey(id, true);
	}
	
	private AttachmentDTO castDocument(Document document){
		AttachmentDTO dto = new AttachmentDTO();
		if (document != null){
			dto.setId(document.getItemValueString("id"));
			dto.setUrl("url del documento");
		}
		return dto;
	}
	
	private void processUploadedFile(FileItem item, MIMEEntity mime)
			throws HandlerGenericException {

		try {
			MIMEEntity child = mime.createChildEntity();

			MIMEHeader header = child.createHeader("content-disposition");
			header.setHeaderVal("attachment;filename=\"" + item.getName()
					+ "\"");

			Stream stream = this.session.createStream();
			stream.write(item.get());

			child.setContentFromBytes(stream, item.getContentType(),
					MIMEEntity.ENC_IDENTITY_BINARY);
			child.decodeContent();

		} catch (Exception exception) {
			throw new HandlerGenericException(exception);
		}
	}

}
