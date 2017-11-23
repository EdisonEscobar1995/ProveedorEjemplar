package com.nutresa.exemplary_provider.utils;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class TemplateMail {
    private static final String FILE_NAME = "D:/IBM/Domino/data/domino/html/template_email.txt";

    private static String getTemplateInFile() throws IOException {
        BufferedReader buffReader = new BufferedReader(new InputStreamReader(new FileInputStream(FILE_NAME)));
        String line = buffReader.readLine();
        StringBuilder template = new StringBuilder();
        while (line != null) {
            template.append(line);
            line = buffReader.readLine();
        }

        return template.toString();
    }

    public static String buildMessage(String message) throws IOException {
        String template = getTemplateInFile();
        return template.replace("[MESSAGE_HERE]", message);
    }

}
