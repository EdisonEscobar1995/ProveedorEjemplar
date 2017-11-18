package com.nutresa.exemplary_provider.api;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openntf.domino.utils.DominoUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ibm.xsp.webapp.DesignerFacesServlet;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;

public class ErrorAPI extends DesignerFacesServlet {

    public void service(final ServletRequest servletRequest, final ServletResponse servletResponse) throws ServletException, IOException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        response.setContentType("application/json");
        ServletOutputStream output = response.getOutputStream();

        try {
            doService(request, response, output);
        } catch (Exception exception) {
            DominoUtils.handleException(new Throwable(exception));
        } finally {
            output.close();
        }
        
    }
    
    @SuppressWarnings("unchecked")
    protected void doService(HttpServletRequest request, HttpServletResponse response, ServletOutputStream output) throws IOException {
        ServletResponseDTO servletResponse = null;
        Gson gson = new GsonBuilder().serializeNulls().setPrettyPrinting().create();

        servletResponse = new ServletResponseDTO(false, "What the fuck are you trying to do, break the server?");

        response.setStatus(500);
        output.print(gson.toJson(servletResponse));
    }
}