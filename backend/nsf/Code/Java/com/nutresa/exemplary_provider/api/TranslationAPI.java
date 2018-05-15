package com.nutresa.exemplary_provider.api;

import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;

import com.nutresa.exemplary_provider.bll.TranslationBLO;
import com.nutresa.exemplary_provider.dal.TranslationDAO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.TranslationDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TranslationAPI extends GenericAPI<TranslationDTO, TranslationBLO> {

    public TranslationAPI() {
        super(TranslationDTO.class, TranslationBLO.class);
    }

    public ServletResponseDTO<String> setLanguage(Map<String, String> parameters) {
        TranslationBLO translationBLO = TranslationBLO.getInstance();
        String language = translationBLO.setLanguage(parameters.get(TranslationDAO.PARAMETER_NAME));
        Cookie langCookie = new Cookie(TranslationDAO.COOKIE_NAME, language);
        langCookie.setMaxAge(60 * 60 * 4);
        this.httpResponse.addCookie(langCookie);
        return new ServletResponseDTO<String>(language);
    }

    public ServletResponseDTO<String> clearLanguage(Map<String, String> parameters) {
        TranslationBLO translationBLO = TranslationBLO.getInstance();
        if (parameters.containsKey("entity")) {
            translationBLO.clearLanguage(parameters.get("entity"));
        } else {
            translationBLO.clearLanguage();
        }
        return new ServletResponseDTO<String>("Language cleared");
    }

    public ServletResponseDTO<String> clearLanguage() {
        TranslationBLO translationBLO = TranslationBLO.getInstance();
        translationBLO.clearLanguage();
        return new ServletResponseDTO<String>("Language cleared");
    }

    public ServletResponseDTO<Map<String, List<String>>> getMastersWithFieldsToTranslate() {
        TranslationBLO translationBLO = new TranslationBLO();
        return new ServletResponseDTO<Map<String, List<String>>>(translationBLO.getMastersWithFieldsToTranslate());
    }

    public ServletResponseDTO<TranslationDTO> getByEntityIdAndLanguage(Map<String, String> parameters) {
        ServletResponseDTO<TranslationDTO> response = null;
        TranslationBLO translationBLO = new TranslationBLO();
        try {
            response = new ServletResponseDTO<TranslationDTO>(translationBLO.getByEntityIdAndLanguage(
                    parameters.get("entityId"), parameters.get("lang"), parameters.get("fieldName")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<TranslationDTO>(exception);
        }

        return response;
    }
}
