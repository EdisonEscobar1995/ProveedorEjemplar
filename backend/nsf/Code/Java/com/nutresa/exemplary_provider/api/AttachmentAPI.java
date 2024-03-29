package com.nutresa.exemplary_provider.api;

import java.io.File;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import com.ibm.xsp.http.fileupload.FileItem;
import com.ibm.xsp.http.fileupload.disk.DiskFileItemFactory;
import com.ibm.xsp.http.fileupload.servlet.ServletFileUpload;
import com.nutresa.exemplary_provider.bll.AttachmentBLO;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AttachmentAPI extends BaseAPI<AttachmentDTO> {

    public AttachmentAPI() {
        super(AttachmentDTO.class);
    }

    @Override
    @SuppressWarnings("unchecked")
    protected ServletResponseDTO doPost(String action, HttpServletRequest request) {
        ServletResponseDTO response = null;

        try {
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);

            if (!isMultipart) {
                throw new HandlerGenericException("That's not multipart content: we need that to continue");
            }

            DiskFileItemFactory factory = new DiskFileItemFactory();
            ServletContext servletContext = this.getServletConfig().getServletContext();
            File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
            factory.setRepository(repository);

            ServletFileUpload upload = new ServletFileUpload(factory);
            List<FileItem> items = upload.parseRequest(request);

            AttachmentBLO blo = new AttachmentBLO();
            response = new ServletResponseDTO<AttachmentDTO>(blo.save(items));
        } catch (Exception exception) {
            response = new ServletResponseDTO(exception);
        }

        return response;

    }

    public ServletResponseDTO<AttachmentDTO> get(Map<String, String> parameters) {
        AttachmentBLO blo = new AttachmentBLO();
        return new ServletResponseDTO<AttachmentDTO>(blo.get(parameters.get("id")));
    }

    @SuppressWarnings("unchecked")
    public ServletResponseDTO delete(Map<String, String> parameters) {
        AttachmentBLO blo = new AttachmentBLO();
        return new ServletResponseDTO(blo.delete(parameters.get("id")));
    }

}
