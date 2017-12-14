package com.nutresa.exemplary_provider.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URLConnection;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

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
        BufferedReader buffReader = new BufferedReader(new InputStreamReader(conexion.getInputStream(), "UTF-8"));
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

    public static String buildMessage(String message, boolean requireTableDetail, Map<String, String> dataDetail,
            boolean requireButton, String linkButton, String pathBanner, String pathFooter) throws HandlerGenericException {
        String template = "";
        try {
            template = getTemplateInFile();
            template = template.replace("[MESSAGE_HERE]", message);
            template = template.replace("[HEADER]", pathBanner);

            if (requireTableDetail) {
                template = template.replace("[TEMPLATE_BY_TABLE_DETAIL]", buildTableDatail(dataDetail));
            } else {
                template = template.replace("[TEMPLATE_BY_TABLE_DETAIL]", "");
            }

            if (requireButton) {
                template = template.replace("[TEMPLATE_BY_BUTTON]", buildButton(linkButton));
            } else {
                template = template.replace("[TEMPLATE_BY_BUTTON]", "");
            }

            template = template.replace("[FOOTER]", pathFooter);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return template;
    }

    @SuppressWarnings("unchecked")
    private static String buildTableDatail(Map<String, String> data) {
        String rowHead = "";
        String rowData = "";

        Iterator entries = data.entrySet().iterator();
        while (entries.hasNext()) {
            Entry entry = (Entry) entries.next();
            String key = (String) entry.getKey();
            rowHead += "<td bgcolor='#f5f5f5' style='border:1px solid #ccc;color:#37907c; "
                    + "font-family:Verdana, Genevea, sans-serif; font-weight:600; line-height:normal; "
                    + "font-size:14px; padding:10px 14px'>" + key + "</td>";
            String value = (String) entry.getValue();
            rowData += "<td style='border:1px solid #ccc;color:#7c7c7c;font-family:Verana, Geneva, sans-serif; "
                    + "font-weight:300; line-height:normal; padding:10px 14px;'>" + value + "</td>";
        }

        String table = "<tr><td><table cellpadding='0' cellspacing='0' width='100%' style='border-color: #cccccc;'>"
                + "<thead><tr>[COLUMN_HEADER]</tr></thead><body><tr>[COLUMN_DATA]" + "</tr></body></table></td></tr><tr>"
            + "<td class='height15' height='40' style='font-size:1px; line-height:1px;'>&nbsp;</td></tr>";

        table = table.replace("[COLUMN_HEADER]", rowHead);
        table = table.replace("[COLUMN_DATA]", rowData);

        return table;
    }

    private static String buildButton(String linkButton) {
        String templateButton = "<tr><td><table cellpadding='0' cellspacing='0' width='100%'>"
                + "<tbody><tr><td style='text-align: center;'><a href='[LINK_BUTTON]' "
                + "style='background-color: #37907c; border: none; color: white; padding: 15px 40px 15px 40px; "
                + "text-align: center; text-decoration: none; display: inline-block; font-size: 14px; "
                + "margin: 4px 2px; cursor: pointer; border-radius: 12px; font-family: Verdana, Geneva, sans-serif; "
                + "font-weight: 300;'>Continuar</a></td></tr></tbody></table>"
                + "</td></tr><tr><td class='height15' height='40' style='font-size:1px; "
                + "line-height:1px;'>&nbsp;</td></tr>";
        templateButton = templateButton.replace("[LINK_BUTTON]", linkButton);

        return templateButton;
    }

}
