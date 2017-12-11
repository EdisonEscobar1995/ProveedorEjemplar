package com.nutresa.exemplary_provider.api;

import java.util.Map;

import javax.servlet.http.Cookie;

import com.nutresa.exemplary_provider.bll.TranslationBLO;
import com.nutresa.exemplary_provider.dal.TranslationDAO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.TranslationDTO;

public class TranslationAPI extends GenericAPI<TranslationDTO, TranslationBLO> {

    public TranslationAPI() {
        super(TranslationDTO.class, TranslationBLO.class);
    }
    
    public ServletResponseDTO<String> setLanguage(Map<String, String> parameters) {
        TranslationBLO translationBLO = TranslationBLO.getInstance();
        String language = translationBLO.setLanguage(parameters.get(TranslationDAO.PARAMTER_NAME));
        Cookie langCookie = new Cookie(TranslationDAO.COOKIE_NAME, language);
        langCookie.setMaxAge(60 * 60 * 4);        
        this.response.addCookie(langCookie);
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
}
