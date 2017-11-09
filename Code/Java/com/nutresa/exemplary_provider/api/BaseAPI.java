package com.nutresa.exemplary_provider.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
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
import com.google.gson.JsonSyntaxException;
import com.ibm.xsp.extlib.util.ExtLibUtil;
import com.ibm.xsp.webapp.DesignerFacesServlet;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.Common;

import org.openntf.domino.utils.DominoUtils;

public class BaseAPI<T> extends DesignerFacesServlet {

    protected Class<T> dtoClass;

    public BaseAPI(Class<T> dtoClass) {
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
            DominoUtils.handleException(new Throwable(exception));
        } finally {
            facesContext.responseComplete();
            facesContext.release();
            output.close();
        }
    }

    @SuppressWarnings("unchecked")
    protected void doService(HttpServletRequest request,
            HttpServletResponse response, FacesContext facesContext,
            ServletOutputStream output) throws IOException {

        int status = 200;
        ServletResponseDTO servletResponse = null;
        Gson gson = new GsonBuilder().enableComplexMapKeySerialization()
        .excludeFieldsWithoutExposeAnnotation().serializeNulls()
        .setDateFormat("Y/m/d").setPrettyPrinting().create();

        try {
            String requestMethod = request.getMethod();
            Map<String, String> parameters = (Map<String, String>) ExtLibUtil
            .resolveVariable(FacesContext.getCurrentInstance(), "param");
            String action = parameters.get("action");

            Method method = Common.getMethod(this.getClass(), action);
            if (null != method) {
                if ("GET".equals(requestMethod)) {
                    servletResponse = doGet(method, parameters);
                } else if ("POST".equals(requestMethod)) {
                    servletResponse = doPost(method, request.getReader(), gson);
                } else if ("OPTIONS".equals(requestMethod)) {
                    doOptions(response, output);
                } else {
                    status = 405;
                    servletResponse = new ServletResponseDTO(false,
                    "What the devil are you trying to do, break the server?");
                }
            } else {
                servletResponse = new ServletResponseDTO(false,
                "Action not found");
            }
        } catch (Exception exception) {
            status = 500;
            servletResponse = new ServletResponseDTO(false, exception);
        } finally {
            response.setStatus(status);
            output.print(gson.toJson(servletResponse));
        }
    }

    @SuppressWarnings("unchecked")
    private ServletResponseDTO doGet(Method method,
            Map<String, String> parameters) throws IllegalAccessException, InvocationTargetException {
        return (ServletResponseDTO) method.invoke(this, parameters);
    }

    @SuppressWarnings("unchecked")
    private ServletResponseDTO doPost(Method method, BufferedReader reader,
            Gson gson) throws IOException, JsonSyntaxException,
            IllegalAccessException, InvocationTargetException {
        String inputLine = null;
        StringBuilder stringBuilder = new StringBuilder();
        while ((inputLine = reader.readLine()) != null) {
            stringBuilder.append(inputLine);
        }
        reader.close();

        return (ServletResponseDTO) method.invoke(this, gson.fromJson(
                stringBuilder.toString(), this.dtoClass));
    }

    private void doOptions(HttpServletResponse response,
            ServletOutputStream output) throws IOException {
        response
        .addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "*");
        response.addHeader("Access-Control-Allow-Origin", "*");
        output.print(" ");
    }
}