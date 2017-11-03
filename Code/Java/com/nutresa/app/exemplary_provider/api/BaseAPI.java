package com.nutresa.app.exemplary_provider.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintStream;
import java.lang.reflect.Method;
import java.util.Map;

import javax.faces.context.FacesContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ibm.xsp.extlib.util.ExtLibUtil;
import com.ibm.xsp.webapp.DesignerFacesServlet;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;

public class BaseAPI extends DesignerFacesServlet{
	
	protected Class<?> dtoClass;
	
	public BaseAPI(Class<?> dtoClass){
		this.dtoClass = dtoClass;
	}
	
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
		} catch (Exception exception) {
			exception.printStackTrace(new PrintStream(output));
		} finally {
			facesContext.responseComplete();
			facesContext.release();
			output.close();
		}
	}
	
	@SuppressWarnings("unchecked")
	protected void doService(HttpServletRequest request, HttpServletResponse response,
			FacesContext facesContext, ServletOutputStream output) throws Exception{
		
		int status = 200;
		ServletResponseDTO servletResponse = null;
		Gson gson = new GsonBuilder().enableComplexMapKeySerialization().excludeFieldsWithoutExposeAnnotation().serializeNulls()
        .setDateFormat("Y/m/d").setPrettyPrinting().create();
		
		try{
			String requestMethod = request.getMethod();
			Map<String, String> parameters = (Map<String, String>)ExtLibUtil.resolveVariable(FacesContext.getCurrentInstance(), "param");
			String action = parameters.get("action");
			
			if( requestMethod.equals("GET") ) {
				Method method = this.getClass().getMethod(action, Map.class);
				servletResponse = (ServletResponseDTO) method.invoke(this, parameters);
				
			} else if(requestMethod.equals("POST")) {
				
				BufferedReader reader = request.getReader();
				String inputLine = null;
				StringBuffer stringBuffer = new StringBuffer();
				while ((inputLine = reader.readLine()) != null) {
					stringBuffer.append(inputLine);
				}
				reader.close(); 
				Method method = this.getClass().getMethod(action, this.dtoClass);
				servletResponse = (ServletResponseDTO) method.invoke(this, gson.fromJson(stringBuffer.toString(), this.dtoClass));
				
			} else if( requestMethod.equals("OPTIONS") ) {

				response.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
				response.addHeader("Access-Control-Allow-Headers", "*");
				response.addHeader("Access-Control-Allow-Origin", "*");
				output.print(" ");

			} else {
				status = 405;
				servletResponse = new ServletResponseDTO(false, "what the devil are you trying to do, break the server?");
			}
		}catch (Exception exception) {
			status = 500;
			servletResponse = new ServletResponseDTO(false, exception.getMessage());
		}finally{
			response.setStatus(status);
			output.print(gson.toJson(servletResponse));
		}
		
	}
}