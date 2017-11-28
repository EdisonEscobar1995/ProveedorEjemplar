package com.nutresa.exemplary_provider.api;

import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.CharBuffer;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.faces.context.FacesContext;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
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

        response.setContentType("application/json; charset=utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.setCharacterEncoding("UTF-8");
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
                    servletResponse = doPost(action, request);
                    break;
                case OPTIONS:
                    doOptions(response, output);
                    break;
                default:
                    status = 405;
                    servletResponse = new ServletResponseDTO(false,
                            "Method not allowed");
    
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
            Gson gson = new GsonBuilder().enableComplexMapKeySerialization().excludeFieldsWithoutExposeAnnotation().serializeNulls()
                .setDateFormat("yyyy/MM/dd").setPrettyPrinting().create();
            
            String jsonResponse = gson.toJson(servletResponse);
            byte[] utf8JsonString = jsonResponse.getBytes("UTF8");
            output.write(utf8JsonString, 0, utf8JsonString.length);            
        }
    }

    @SuppressWarnings("unchecked")
    protected Map<String, String> getParameters(HttpServletRequest request) {
        LinkedHashMap<String, String> parameters = new LinkedHashMap<String, String>();
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String key = parameterNames.nextElement();
            String val = request.getParameter(key);
            parameters.put(key, val);
        }
        return parameters;
    }

    @SuppressWarnings("unchecked")
    protected ServletResponseDTO doGet(String action, Map<String, String> parameters) throws IllegalAccessException,
        InvocationTargetException, HandlerGenericException {
        ServletResponseDTO response = null;
        int parameterSize = parameters.size() == 0 ? 0 : 1;
        Method method = getActionMethod(action, parameterSize);
        if (parameterSize == 0) {
            response = (ServletResponseDTO) method.invoke(this);
        } else {
            response = (ServletResponseDTO) method.invoke(this, parameters);
        }
        return response;
    }

    private Method getActionMethod(String action, int parameters) throws HandlerGenericException {
        Method method = Common.getMethod(this.getClass(), action, parameters);
        if (null == method) {
            throw new HandlerGenericException("Action (" + action + ") method not found for " + parameters + " parameters");
        }
        return method;
    }

    @SuppressWarnings("unchecked")
    protected ServletResponseDTO doPost(String action, HttpServletRequest request) throws IOException, IllegalAccessException,
    	InvocationTargetException, HandlerGenericException {
    
    	T postBody = getPostBody(request.getInputStream());

        Method method = getActionMethod(action, 1);                    
        return (ServletResponseDTO) method.invoke(this, postBody);
    }

    protected T getPostBody(ServletInputStream InputStream) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        
        InputStreamReader streamReader = new InputStreamReader(InputStream, "UTF-8");

        CharBuffer charBuffer = CharBuffer.allocate(1024);
        while (streamReader.read(charBuffer) > 0) {
            charBuffer.flip();
            stringBuilder.append(charBuffer.toString());
            charBuffer.clear();
        }
        streamReader.close();
        
        Gson gson = new GsonBuilder().enableComplexMapKeySerialization().excludeFieldsWithoutExposeAnnotation().serializeNulls()
        .setDateFormat("yyyy/MM/dd").setPrettyPrinting().create();
        
        return gson.fromJson(stringBuilder.toString(), this.dtoClass);
    }

    protected void doOptions(HttpServletResponse response, ServletOutputStream output) throws IOException {
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "*");
        response.addHeader("Access-Control-Allow-Origin", "*");
        output.print(" ");
    }
    
}