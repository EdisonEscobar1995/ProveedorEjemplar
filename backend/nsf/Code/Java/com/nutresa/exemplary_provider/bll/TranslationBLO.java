package com.nutresa.exemplary_provider.bll;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.Cookie;

import com.nutresa.exemplary_provider.dal.TranslationDAO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.TranslationDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TranslationBLO extends GenericBLO<TranslationDTO, TranslationDAO> {

    private static TranslationBLO instance = null;
    private Map<String, HashMap<String, String>> translationTable = new HashMap<String, HashMap<String, String>>();
    private final static Translator cleanTranslator = new Translator();
    private final String defaultLanguage = "es";
    private String language = defaultLanguage; 
    
    public TranslationBLO() {
        super(TranslationDAO.class);
    }
    
    public static TranslationBLO getInstance() {
        if (null == instance) {
            instance = new TranslationBLO();
        }
        return instance;
    }    
    
    protected void loadTranslation(String language, String entity) throws HandlerGenericException {
        Map<String, String> filter = new HashMap<String, String>();
        filter.put("language", language);
        filter.put("entity", entity);
        List<DTO> listTranslations = getAllBy(filter);
        
        HashMap<String, String> entityTranslations = new HashMap<String, String>();
        for (Object translation : listTranslations) {
            TranslationDTO dto = (TranslationDTO) translation;
            entityTranslations.put(dto.getEntityId() + "_" + dto.getName(), dto.getValue());
        }
        translationTable.put(language + "_" + entity, entityTranslations);
    }
    
    public Translator getTranslator(String language, String entity) {
        if (!translationTable.containsKey(language + "_" + entity)) {
            try {
                loadTranslation(language, entity);
            } catch (HandlerGenericException exception) {
                // TODO guardar la excepcion
                exception.printStackTrace();
            }
        }
        return new Translator(translationTable.get(language + "_" + entity));
    }

    public Translator getTranslator() {
        return cleanTranslator;
    }
    
    public String setLanguage(String language) {
        language = language.toLowerCase();
        if (null != language && ("en".equals(language) || "es".equals(language))) {
            this.language = language;
        } else {
            this.language = defaultLanguage;
        }
        return this.language;
    }

    public String getLanguage() {
        return language;
    }

    public void clearLanguage(String entity) {
        if (translationTable.containsKey(entity)) {
            translationTable.remove(entity);
        }
    }
    
    public void clearLanguage() {
        translationTable = new HashMap<String, HashMap<String, String>>();
    }
    
    public String getClientLanguage(Map<String, String> parameters, Locale locale, Cookie[] cookies) {
        String clientLanguage = null;
        String response = null;

        if (parameters.containsKey(TranslationDAO.PARAMTER_NAME)) {
            clientLanguage = parameters.get(TranslationDAO.PARAMTER_NAME);
            if (!parameters.containsValue("setLanguage")) {
                parameters.remove(TranslationDAO.PARAMTER_NAME);
            }
        } else {
            if(null != cookies){
                for (Cookie cookie : cookies) {
                    if (TranslationDAO.COOKIE_NAME.equalsIgnoreCase(cookie.getName())) {
                        clientLanguage = cookie.getValue();
                    }
                }
            }
        }
        if (null == clientLanguage) {
            response = clientLanguage = locale.getLanguage();
        }
        clientLanguage = setLanguage(clientLanguage);
        return clientLanguage.equals(response) ? response : null;
    }

    static public class Translator {

        private HashMap<String, String> translations = null;

        protected Translator(HashMap<String, String> translations) {
            this.translations = translations;
        }

        public Translator() {
            this.translations = null;
        }

        public boolean isEmpty() {
            return null == translations || translations.size() == 0;
        }

        public boolean hasTranslation(String id, String name) {
            return !isEmpty() && translations.containsKey(id + "_" + name);
        }

        public Object getValue(String id, String name) {
            return translations.get(id + "_" + name);
        }

    }
}
