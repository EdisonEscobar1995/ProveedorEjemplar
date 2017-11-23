package com.nutresa.exemplary_provider.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URLConnection;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;

public class TemplateMail {
    private static final String FILE_NAME = "/template_email.txt";

    private TemplateMail() {
        throw new IllegalStateException("Utility class");
    }

    private static String getTemplateInFile() throws HandlerGenericException, IOException {
        FacesContext facesContext = FacesContext.getCurrentInstance();
        ExternalContext externalContext = facesContext.getExternalContext();
        URLConnection conexion = externalContext.getResource(FILE_NAME).openConnection();
        BufferedReader buffReader = new BufferedReader(new InputStreamReader(conexion.getInputStream()));
        StringBuilder template = new StringBuilder();
        try {
            String line = buffReader.readLine();
            while (line != null) {
                template.append(line);
                line = buffReader.readLine();
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        } finally {
            buffReader.close();
        }

        return template.toString();
    }

    public static String buildMessage(String message) throws HandlerGenericException {
        String template = "";
        try {
            template = getTemplateInFile();
            template = template.replace("[MESSAGE_HERE]", message);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return template;
    }

}
