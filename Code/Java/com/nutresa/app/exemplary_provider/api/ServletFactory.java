package com.nutresa.app.exemplary_provider.api;

//import java.util.HashMap;
//import java.util.Iterator;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import com.ibm.designer.runtime.domino.adapter.ComponentModule;
import com.ibm.designer.runtime.domino.adapter.IServletFactory;
import com.ibm.designer.runtime.domino.adapter.ServletMatch;

/**
 * The factory (a provider) implements IServletFactory and creates two maps, for
 * key to package.class and key to servletname matching.
 */
public class ServletFactory implements IServletFactory {
    private static String namespace = "Nutresa.ExemplaryProvider.API.";
    private String apiSuffix = "API";
    private ComponentModule module;

    /**
     * init adds the classes and servlet names, mapping to the same key.
     */
    public void init(ComponentModule module) {
        this.module = module;
    }

    /**
     * The ServletMatch matches the path to the correctly identified servlet; by
     * the routed key.
     */
    public ServletMatch getServletMatch(String contextPath, String path) throws ServletException {
        try {
            String servletPath = "";
            String[] pathLevels = path.split("/");
            if (pathLevels.length >= 3 && !pathLevels[2].isEmpty()) {
                String pathInfo = path;
                return new ServletMatch(getWidgetServlet(pathLevels[2]), servletPath, pathInfo);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return null;
    }

    public Servlet getWidgetServlet(String servetName) throws ServletException {
        return module.createServlet(namespace + servetName + apiSuffix, servetName, null);
    }
}