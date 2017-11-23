package com.nutresa.exemplary_provider.api;

import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.util.List;

import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.ibm.xsp.http.fileupload.FileItem;
import com.ibm.xsp.http.fileupload.disk.DiskFileItemFactory;
import com.ibm.xsp.http.fileupload.servlet.ServletFileUpload;
import com.ibm.xsp.webapp.DesignerFacesServlet;
import com.nutresa.exemplary_provider.bll.AttachmentBLO;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;

public class AttachmentAPI extends DesignerFacesServlet {

	public void service(final ServletRequest servletRequest,
			final ServletResponse servletResponse) throws ServletException,
			IOException {
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		HttpServletRequest request = (HttpServletRequest) servletRequest;

		response.setContentType("application/json");
		ServletOutputStream output = response.getOutputStream();
		FacesContext facesContext = this.getFacesContext(request, response);

		try {
			doService(request, response, facesContext, output);
		} catch (Exception e) {
			e.printStackTrace(new PrintStream(output));
		} finally {
			facesContext.responseComplete();
			facesContext.release();
			output.close();
		}
	}

	@SuppressWarnings("unchecked")
	private void doService(HttpServletRequest request, HttpServletResponse response,
			FacesContext facesContext, ServletOutputStream output)
			throws Exception {

		int status = 200;
		ServletResponseDTO servletResponse = null;
		Gson gson = new Gson();

		try {
			if ("POST".equals(request.getMethod())) {
				servletResponse = doPost(request);
			} else {
				status = 405;
				servletResponse = new ServletResponseDTO(false,	"Method not allowed");
			}

		} catch (Exception exception) {
			status = 500;
            servletResponse = new ServletResponseDTO(exception);
		} finally {
			response.setStatus(status);
			output.println(gson.toJson(servletResponse));
		}

	}
	
	private ServletResponseDTO<AttachmentDTO> doPost(HttpServletRequest request) throws Exception{
		
		ServletResponseDTO<AttachmentDTO> response = null;
		
		try{
			boolean isMultipart = ServletFileUpload.isMultipartContent(request);
			
			if (!isMultipart) {
				throw (new Exception(
				"That's not multipart content: we need that to continue"));
			}
			
			DiskFileItemFactory factory = new DiskFileItemFactory();
			
			ServletContext servletContext = this.getServletConfig()
			.getServletContext();
			File repository = (File) servletContext
			.getAttribute("javax.servlet.context.tempdir");
			factory.setRepository(repository);
			
			ServletFileUpload upload = new ServletFileUpload(factory);
			
			List<FileItem> items = upload.parseRequest(request);
			
			AttachmentBLO blo = new AttachmentBLO();
			response = new ServletResponseDTO<AttachmentDTO>(blo.save(items));
		
		}catch(Exception exception){
			response = new ServletResponseDTO<AttachmentDTO>(exception);
		}
		return response;
	}

}
