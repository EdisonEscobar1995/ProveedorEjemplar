package Nutresa.ExemplaryProvider.API;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import javax.faces.context.FacesContext;
import javax.faces.el.MethodNotFoundException;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Nutresa.ExemplaryProvider.DTL.RequestReturnDTO;
import Nutresa.ExemplaryProvider.Types.JsonParameterProvider;
import Nutresa.ExemplaryProvider.Types.ParameterProvider;
import Nutresa.ExemplaryProvider.Types.Parameters;
import Nutresa.ExemplaryProvider.Types.Tools;
import Nutresa.ExemplaryProvider.Types.UrlParameterProvider;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ibm.xsp.webapp.DesignerFacesServlet;

//public class BaseAPI extends HttpServlet {
public class BaseAPI extends DesignerFacesServlet {
    private static final long serialVersionUID = 1000L;
    protected HttpServletRequest request;
    protected HttpServletResponse response;
    protected JsonObject json;
    
    protected boolean status = true;
    protected Parameters params;        
    
    protected String message = "";
    private FacesContext facesContext;
    private ParameterProvider provider;
    
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        try {
            request = (HttpServletRequest) servletRequest;
            response = (HttpServletResponse) servletResponse;
            facesContext = this.getFacesContext(request, response);

            String reqMethod = request.getMethod().toLowerCase();
            if (reqMethod.equals("options")) {
                doOptions(request, response);
            } else {
                processRequest(request, response);
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            facesContext.responseComplete();
            facesContext.release();
            response.getWriter().close();
        }
    } 

    protected String getPathSegment(String path, int segment) {
        String[] pathLevels = path.split("/");
        String segmentString = null;
        if (pathLevels.length > segment && !pathLevels[segment].isEmpty()) {
            segmentString = pathLevels[segment].trim();
        }
        return segmentString;
    }

    protected String getAction(String path, String defaultValue) {
        String action = getPathSegment(path, 3);
        if (null != action) {
            action = new String(defaultValue + action.substring(0, 1).toUpperCase() + action.substring(1));
        } else {
            action = new String(defaultValue);
        }
        return action.trim();
    }
    
    protected Object call(String action, JsonObject json) throws SecurityException, NoSuchMethodException, IllegalAccessException,
        InstantiationException, IllegalArgumentException, InvocationTargetException, Exception {
        
        Object returnMethod = null;
        params = new Parameters(provider);
        int jsonParameterSize = params.length();
        boolean foundMethod = false;
        
        Method[] methods = this.getClass().getDeclaredMethods();
        
        for (Method method : methods) {
            if (action.compareTo(method.getName()) == 0) {
                Class<?>[] parameterType = method.getParameterTypes();
                int parametersSize = parameterType.length;
                if (parametersSize == jsonParameterSize) {
                    Object[] parameterCall = params.getParameters(parameterType);
                    returnMethod = method.invoke(this, parameterCall);
                    foundMethod = true;
                }
            }
            if(foundMethod){
                break;
            }
        }
        if(!foundMethod){
            throw new MethodNotFoundException("Method: " + this.getClass().getSimpleName() + "." + action + "("
                + Tools.StringRepeat("?", ',', jsonParameterSize) + ")");
        }
        return returnMethod;
    }
    
    protected void processRequest(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        String method = req.getMethod().toLowerCase();
        String action = getAction(req.getPathInfo(), method);
        String apiName = this.getClass().getSimpleName();

        apiName = apiName.substring(0, apiName.length() - 3);
        RequestReturnDTO requestReturn = null;
        try {
            Object returnMethod = null;
            this.request = req;
            this.response = res;
            res.setContentType("application/json");
            PrintWriter out = res.getWriter();

            if (method.equals("get")) {
                provider = new UrlParameterProvider(request.getQueryString());
            } else {
                json = getContentJson(req);
                provider = new JsonParameterProvider(json);
            }
            try {
                returnMethod = call(action, json);
                if (returnMethod != null) {
                    if (returnMethod.getClass().isArray()) {
                        requestReturn = new RequestReturnDTO((Object[]) returnMethod, this.getMessage() + apiName, this.getStatus());
                    } else {
                        requestReturn = new RequestReturnDTO((Object) returnMethod, this.getMessage() + apiName, this.getStatus());
                    }
                }
            } catch (Exception e) {
                String message = e.getClass().getName() + ", ";
                if (e.getCause() != null) {
                    message += e.getCause().getMessage();
                } else {
                    message += e.getMessage();
                }
                requestReturn = new RequestReturnDTO(message, false);
            }
            if (requestReturn != null) {
                Gson gson = new GsonBuilder().enableComplexMapKeySerialization().excludeFieldsWithoutExposeAnnotation().serializeNulls()
                    .setDateFormat("Y/m/d") // TODO MAF parametrizar
                    .setPrettyPrinting().create();

                out.print(gson.toJson(requestReturn));
                out.flush();
            }
            out.close();
        } catch (NoSuchMethodException e) {
            res.setStatus(404);
        } catch (Exception e) {
            res.setStatus(501);
        }
    }
    
    protected JsonObject getContentJson(HttpServletRequest req) throws IOException, Exception {
        JsonObject json = null;
        StringBuffer stringBuffer = new StringBuffer();
        if (req.getContentLength() > 0) {
            BufferedReader reader = req.getReader();
            String inputLine = null;
            while ((inputLine = reader.readLine()) != null) {
                stringBuffer.append(inputLine);
            }
            reader.close();
        }
        // stringBuffer = new StringBuffer(
        // "{\"params\":[{\"a\":\"dfdfdf\",\"b\":4,\"c\":343,\"d\":\"\"},{\"a\":\"sdfdsasdfdfdf\",\"b\":4,\"c\":343,\"d\":\"\"},{\"a\":\"dfdfd45343525f\",\"b\":4,\"c\":343,\"d\":\"\"}]}");
        // stringBuffer = new StringBuffer();
        // "{\"params\":[{\"a\":\"dfdfdf\",\"b\":4,\"c\":343,\"d\":\"\",\"e\": [\"dfdf\",\"dddfd\",\"rerwr\"]},4]}");
        // "{\"config\":{\"dateFormat\":\"y/m/d\", \"parameterName\":\"parametros\"}, \"parametros\":[{\"a\":\"dfdfdf\",\"b\":4,\"c\":343,\"d\":\"\",\"e\": [\"dfdf\"]},4]}");
        if (stringBuffer.length() > 0) {
            json = new JsonParser().parse(stringBuffer.toString()).getAsJsonObject();
        }
        return json;
    }

    private boolean getStatus() {
        return status;
    }

    private String getMessage() {
        return message;
    }

    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        processRequest(req, res);
    }

    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        processRequest(req, res);
    }

    public void doPut(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        processRequest(req, res);
    }

    public void doDelete(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        processRequest(req, res);
    }
    
    public void doOptions(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        PrintWriter out = res.getWriter();
        res.addHeader("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, PATCH, DELETE");
        res.addHeader("Access-Control-Allow-Headers", "*");
        res.addHeader("Access-Control-Allow-Origin", "*");
        res.setContentType("application/json");
        out.print(" ");
        out.flush();
        out.close();
    }
}