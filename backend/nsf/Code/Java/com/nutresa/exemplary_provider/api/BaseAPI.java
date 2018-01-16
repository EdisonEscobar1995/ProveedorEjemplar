package com.nutresa.exemplary_provider.api;

import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.CharBuffer;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.faces.context.FacesContext;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ibm.xsp.http.io.IOUtils;
import com.ibm.xsp.webapp.DesignerFacesServlet;
import com.nutresa.exemplary_provider.bll.LogBLO;
import com.nutresa.exemplary_provider.bll.TranslationBLO;
import com.nutresa.exemplary_provider.bll.UserBLO;
import com.nutresa.exemplary_provider.dal.TranslationDAO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class BaseAPI<T> extends DesignerFacesServlet {

    protected Class<T> dtoClass;
    protected HttpServletResponse httpResponse;
    protected HttpServletRequest httpRequest;
    protected String dateFomat = "yyyy/MM/dd";
    protected ServletOutputStream output = null;
    protected int status;

    private enum TypeRequestMethod {
        GET, POST, OPTIONS
    }

    public BaseAPI(Class<T> dtoClass) {
        this.dtoClass = dtoClass;
    }

    public void service(final ServletRequest servletRequest, final ServletResponse servletResponse)
            throws ServletException, IOException {

        FacesContext facesContext = null;

        try {
            httpResponse = (HttpServletResponse) servletResponse;
            httpRequest = (HttpServletRequest) servletRequest;
            facesContext = this.getFacesContext(httpRequest, httpResponse);

            httpResponse.setContentType("application/json; charset=utf-8");
            httpResponse.setHeader("Cache-Control", "no-cache");
            httpResponse.setCharacterEncoding("UTF-8");
            output = httpResponse.getOutputStream();

            doService(httpRequest, httpResponse, facesContext, output);
        } catch (Exception exception) {
            LogBLO.log("Error loading servlet", exception);
        } finally {
            if (null != facesContext) {
                facesContext.responseComplete();
                facesContext.release();
            }
            if (null != output) {
                output.close();
            }
        }
    }

    @SuppressWarnings("unchecked")
    protected void doService(HttpServletRequest request, HttpServletResponse response, FacesContext facesContext,
            ServletOutputStream output) throws IOException {

        status = 200;
        ServletResponseDTO servletResponse = null;

        try {
            TypeRequestMethod requestMethod = TypeRequestMethod.valueOf(request.getMethod());
            LinkedHashMap<String, String> parameters = (LinkedHashMap) getParameters(request);

            getClientLanguage(parameters);
            String action = parameters.get("action");
            parameters.remove("action");

            List<String> access = getACL();

            if (requestMethod != TypeRequestMethod.OPTIONS
                    && !validateAccess(access, this.getClass().getSimpleName(), action)) {
                status = 401;
                servletResponse = new ServletResponseDTO<String>(false, "Access denied.");
            } else {
                servletResponse = proccessRequest(requestMethod, action, parameters);
            }

        } catch (Exception exception) {
            status = 500;
            servletResponse = new ServletResponseDTO(exception);
        } finally {
            response.setStatus(status);
            if (null != servletResponse) {
                Gson gson = new GsonBuilder().enableComplexMapKeySerialization().excludeFieldsWithoutExposeAnnotation()
                        .serializeNulls().setDateFormat(dateFomat).setPrettyPrinting().create();

                String jsonResponse = gson.toJson(servletResponse);
                byte[] utf8JsonString = jsonResponse.getBytes("UTF8");
                output.write(utf8JsonString, 0, utf8JsonString.length);
            }
        }
    }

    @SuppressWarnings("unchecked")
    private ServletResponseDTO proccessRequest(TypeRequestMethod requestMethod, String action,
            Map<String, String> parameters) throws HandlerGenericException, IOException, IllegalAccessException,
            InvocationTargetException {
        ServletResponseDTO servletResponse = null;
        if (null != action) {
            switch (requestMethod) {
            case GET:
                servletResponse = doGet(action, parameters);
                break;
            case POST:
                servletResponse = doPost(action, httpRequest);
                break;
            case OPTIONS:
                doOptions(httpResponse, output);
                break;
            default:
                status = 405;
                servletResponse = new ServletResponseDTO(false, "Method not allowed");

                break;
            }
        } else {
            servletResponse = new ServletResponseDTO(false, "Action not found");
        }
        return servletResponse;
    }

    private void getClientLanguage(LinkedHashMap<String, String> parameters) {
        Locale locale = httpRequest.getLocale();
        Cookie[] cookies = httpRequest.getCookies();
        TranslationBLO translationBLO = TranslationBLO.getInstance();
        String language = translationBLO.getClientLanguage(parameters, locale, cookies);
        if (null != language) {
            Cookie langCookie = new Cookie(TranslationDAO.COOKIE_NAME, language);
            langCookie.setMaxAge(60 * 60 * 4);
            this.httpResponse.addCookie(langCookie);
        }
    }

    protected List<String> getACL() throws HandlerGenericException {
        UserBLO userBLO = new UserBLO();
        return userBLO.loadAccess();
    }

    private boolean validateAccess(List<String> access, String api, String action) {
        boolean response = false;
        String[] accessToCheck = new String[] { api + "." + action, "*." + action, api + ".*", "*.*" };

        if (access != null) {
            for (String check : accessToCheck) {
                if (access.contains(check)) {
                    response = true;
                    break;
                }
            }
        }
        return response;
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
            throw new HandlerGenericException("Action (" + action + ") method not found for " + parameters
                    + " parameters");
        }
        return method;
    }

    @SuppressWarnings("unchecked")
    protected ServletResponseDTO doPost(String action, HttpServletRequest request) throws IOException,
            IllegalAccessException, InvocationTargetException, HandlerGenericException {

        T postBody = getPostBody(request.getInputStream());

        Method method = getActionMethod(action, 1);
        return (ServletResponseDTO) method.invoke(this, postBody);
    }

    protected T getPostBody(ServletInputStream inputStream) throws HandlerGenericException {
        StringBuilder stringBuilder = new StringBuilder();

        InputStreamReader streamReader = null;
        try {
            streamReader = new InputStreamReader(inputStream, "UTF-8");

            CharBuffer charBuffer = CharBuffer.allocate(1024);
            while (streamReader.read(charBuffer) > 0) {
                charBuffer.flip();
                stringBuilder.append(charBuffer.toString());
                charBuffer.clear();
            }
        } catch (IOException exception) {
            throw new HandlerGenericException(exception);
        } finally {
            if (null != streamReader) {
                IOUtils.closeQuietly(streamReader);
            }
        }
        Gson gson = new GsonBuilder().enableComplexMapKeySerialization().excludeFieldsWithoutExposeAnnotation()
                .serializeNulls().setDateFormat(dateFomat).setPrettyPrinting().create();

        return gson.fromJson(stringBuilder.toString(), this.dtoClass);
    }

    protected void doOptions(HttpServletResponse response, ServletOutputStream output) throws IOException {
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "*");
        response.addHeader("Access-Control-Allow-Origin", "*");
        output.print(" ");
    }

}