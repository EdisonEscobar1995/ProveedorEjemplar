package com.nutresa.exemplary_provider.utils;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class TemplateMail {
    private static final String FILE_NAME = "D:/IBM/Domino/data/domino/html/template_email.txt";

    private TemplateMail() {
        throw new IllegalStateException("Utility class");
    }

    private static String getTemplateInFile() throws HandlerGenericException {
        BufferedReader buffReader;
        StringBuilder template = new StringBuilder();
        try {
            buffReader = new BufferedReader(new InputStreamReader(new FileInputStream(FILE_NAME)));
            String line = buffReader.readLine();
            while (line != null) {
                template.append(line);
                line = buffReader.readLine();
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return template.toString();
    }

    public static String buildMessage(String message) throws HandlerGenericException {
        String template = "";
        try {
            template = getTemplateInFile();
            template = template.replace("[MESSAGE_HERE]", message);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
        return template;
    }

}
