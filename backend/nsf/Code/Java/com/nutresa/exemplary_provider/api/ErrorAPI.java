package com.nutresa.exemplary_provider.api;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.openntf.domino.utils.DominoUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ibm.xsp.webapp.DesignerFacesServlet;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;

public class ErrorAPI extends DesignerFacesServlet {

    public void service(final ServletRequest servletRequest, final ServletResponse servletResponse) throws ServletException, IOException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        response.setContentType("application/json");
        ServletOutputStream output = response.getOutputStream();

        try {
            Gson gson = new GsonBuilder().serializeNulls().setPrettyPrinting().create();

            ServletResponseDTO<Object> responseDTO = new ServletResponseDTO<Object>(false,
                "What the fuck are you trying to do, break the server?");

            response.setStatus(500);
            output.print(gson.toJson(responseDTO));
        } catch (Exception exception) {
            DominoUtils.handleException(new Throwable(exception));
        } finally {
            output.close();
        }
        
    }
}