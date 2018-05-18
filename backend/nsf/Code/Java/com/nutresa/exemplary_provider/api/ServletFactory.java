package com.nutresa.exemplary_provider.api;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import com.ibm.designer.runtime.domino.adapter.ComponentModule;
import com.ibm.designer.runtime.domino.adapter.IServletFactory;
import com.ibm.designer.runtime.domino.adapter.ServletMatch;
import com.nutresa.exemplary_provider.utils.Common;

/**
 * The factory (a provider) implements IServletFactory and creates two maps, for
 * key to package.class and key to servletname matching.
 */
public class ServletFactory implements IServletFactory {
    private static String namespace = Common.getNamespace(ServletFactory.class);
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
        } catch (Exception exception) {
            Common.logError("Error loading servlet", exception);
            return new ServletMatch(getErrorServlet(), "", "");
        }
        return new ServletMatch(getErrorServlet(), "", "");
    }

    public Servlet getWidgetServlet(String servletName) throws ServletException {
        if (Common.isClass(namespace + servletName + apiSuffix)) {
            return module.createServlet(namespace + servletName + apiSuffix, servletName, null);
        } else {
            return getErrorServlet();
        }
    }

    protected Servlet getErrorServlet() throws ServletException {
        return module.createServlet(namespace + "Error" + apiSuffix, "Error", null);
    }
}