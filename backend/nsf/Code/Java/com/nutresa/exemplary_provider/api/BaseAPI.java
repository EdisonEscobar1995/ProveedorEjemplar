package com.nutresa.exemplary_provider.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.faces.context.FacesContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openntf.domino.utils.DominoUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import com.ibm.xsp.webapp.DesignerFacesServlet;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class BaseAPI<T> extends DesignerFacesServlet {

    protected Class<T> dtoClass;

    private enum typeRequestMethod {
        GET, POST, OPTIONS
    }

    public BaseAPI(Class<T> dtoClass) {
        this.dtoClass = dtoClass;
    }

    public void service(final ServletRequest servletRequest, final ServletResponse servletResponse)
            throws ServletException, IOException {
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
    protected void doService(HttpServletRequest request, HttpServletResponse response, FacesContext facesContext,
            ServletOutputStream output) throws IOException {
    
        int status = 200;
        ServletResponseDTO servletResponse = null;
        Gson gson = new GsonBuilder().enableComplexMapKeySerialization().excludeFieldsWithoutExposeAnnotation()
                .serializeNulls().setDateFormat("Y/m/d").setPrettyPrinting().create();
    
        try {
            typeRequestMethod requestMethod = typeRequestMethod.valueOf(request.getMethod());
            LinkedHashMap<String, String> parameters = (LinkedHashMap) getParameters(request);

            String action = parameters.get("action");
            parameters.remove("action");
    
            if (null != action) {
                switch (requestMethod) {
                case GET:
                    servletResponse = doGet(action, parameters);
                    break;
                case POST:
                    servletResponse = doPost(action, request.getReader(), gson);
                    break;
                case OPTIONS:
                    doOptions(response, output);
                    break;
                default:
                    status = 405;
                    servletResponse = new ServletResponseDTO(false,
                            "What the devil are you trying to do, break the server?");
    
                    break;
                }
            } else {
                servletResponse = new ServletResponseDTO(false, "Action not found");
            }
    
        } catch (Exception exception) {
            status = 500;
            servletResponse = new ServletResponseDTO(exception);
        } finally {
            response.setStatus(status);
            output.print(gson.toJson(servletResponse));
        }
    }

    @SuppressWarnings("unchecked")
    private Map<String, String> getParameters(HttpServletRequest request) {
        LinkedHashMap<String, String> parameters = new LinkedHashMap<String, String>();
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String key = (String) parameterNames.nextElement();
            String val = request.getParameter(key);
            parameters.put(key, val);
        }
        return parameters;
    }

    @SuppressWarnings("unchecked")
    private ServletResponseDTO doGet(String action, Map<String, String> parameters) throws IllegalAccessException,
        InvocationTargetException, HandlerGenericException {
        ServletResponseDTO response = null;
        if (parameters.size() == 0) {
            Method method = Common.getMethod(this.getClass(), action, 0);
            response = (ServletResponseDTO) method.invoke(this);
        } else {
            Method method = Common.getMethod(this.getClass(), action, 1);
            response = (ServletResponseDTO) method.invoke(this, parameters);
        }
        return response;
    }

    @SuppressWarnings("unchecked")
    private ServletResponseDTO doPost(String action, BufferedReader reader, Gson gson) throws IOException,
            JsonSyntaxException,
        IllegalAccessException, InvocationTargetException, HandlerGenericException {
        String inputLine = null;
        StringBuilder stringBuilder = new StringBuilder();
        Method method = Common.getMethod(this.getClass(), action);
        while ((inputLine = reader.readLine()) != null) {
            stringBuilder.append(inputLine);
        }
        reader.close();

        return (ServletResponseDTO) method.invoke(this, gson.fromJson(stringBuilder.toString(), this.dtoClass));
    }

    private void doOptions(HttpServletResponse response, ServletOutputStream output) throws IOException {
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "*");
        response.addHeader("Access-Control-Allow-Origin", "*");
        output.print(" ");
    }
}