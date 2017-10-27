package Nutresa.ExemplaryProvider.API;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Method;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Nutresa.ExemplaryProvider.DTL.RequestReturnDTO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class BaseAPI extends HttpServlet {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    protected HttpServletRequest request;
    protected HttpServletResponse response;
    protected JsonObject json;
    
    protected boolean status;
    
    protected String message = "";

    protected String getPathSegment(String path, int segment) {
        String[] pathLevels = path.split("/");
        String segmentString = null;
        if (pathLevels.length > segment && !pathLevels[segment].isEmpty()) {
            segmentString = pathLevels[segment];
        }
        return segmentString;
    }

    protected String getAction(String path, String defaultValue) {
        String action = getPathSegment(path, 3);
        if (null != action) {
            action = defaultValue + action.substring(0, 1).toUpperCase() + action.substring(1);
        } else
            action = defaultValue;
        return action;
    }
    
    protected Object call(String action, JsonObject json) throws SecurityException, NoSuchMethodException {
        Object returnMethod = null;
        
// String s = json.get(parameterType.getSimpleName()).toString();
        
        Method m;// = this.getClass().getMethod(action);
        
        
        
        Method[] ms = this.getClass().getDeclaredMethods();

        // Class[] parameterTypes = m.getParameterTypes();
        //
        // for (Class parameterType : parameterTypes) {
        //            
        // }
        // try {
        // returnMethod = m.invoke(this);
        // } catch (IllegalArgumentException e) {
        // // TODO Auto-generated catch block
        // e.printStackTrace();
        // } catch (IllegalAccessException e) {
        // // TODO Auto-generated catch block
        // e.printStackTrace();
        // } catch (InvocationTargetException e) {
        // // TODO Auto-generated catch block
        // e.printStackTrace();
        // }
        return returnMethod;
    }
    
    protected void processRequest(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        String method = req.getMethod().toLowerCase();
        String action = getAction(req.getPathInfo(), method);
        String apiName = this.getClass().getSimpleName();

        apiName = apiName.substring(0, apiName.length() - 3);
        
        RequestReturnDTO requestReturn;
        try {
            Object returnMethod = null;
            this.request = req;
            this.response = res;
            res.setContentType("application/json");
            PrintWriter out = res.getWriter();
            Gson gson = new GsonBuilder().enableComplexMapKeySerialization().excludeFieldsWithoutExposeAnnotation().serializeNulls()
                .setDateFormat("Y/m/d").setPrettyPrinting().create();
            // .setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).
            json = getContentJson(req);
            try {
                returnMethod = call(action, json);
                requestReturn = new RequestReturnDTO((Object[]) returnMethod, this.getMessage() + apiName, this
                    .getStatus());
            } catch (Exception e) {
                requestReturn = new RequestReturnDTO(e.getCause().getMessage(), false);
            }
            if (requestReturn != null) {
                out.print(gson.toJson(requestReturn));
                out.flush();
            }
            out.close();
        } catch (NoSuchMethodException x) {
            res.setStatus(404);
        } catch (Exception e) {
            res.setStatus(501);
        }
    }
    
    protected JsonObject getContentJson(HttpServletRequest req) throws IOException, Exception {
        JsonObject json = null;
        if (req.getContentLength() > 0) {
            BufferedReader reader = req.getReader();
            String inputLine = null;
            StringBuffer stringBuffer = new StringBuffer();
            while ((inputLine = reader.readLine()) != null) {
                stringBuffer.append(inputLine);
            }
            stringBuffer = new StringBuffer(
                "{\"NewDTO\":{\"a\":\"dfdfdf\",\"b\":4,\"c\":343.0,\"d\":\"\"},{\"a\":\"sdfdsasdfdfdf\",\"b\":4,\"c\":343.0,\"d\":\"\"},{\"a\":\"dfdfd45343525f\",\"b\":4,\"c\":343.0,\"d\":\"\"}}");
            reader.close();
            json = new JsonParser().parse(stringBuffer.toString()).getAsJsonObject();
        }
        return json;
    }

    private boolean getStatus() {
        return status;
    }

    private String getMessage() {
        // TODO Auto-generated method stub
        return message;
    }

    @Override
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