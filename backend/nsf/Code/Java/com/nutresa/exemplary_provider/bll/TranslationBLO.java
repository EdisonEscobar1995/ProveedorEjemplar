package com.nutresa.exemplary_provider.bll;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.Cookie;

import com.nutresa.exemplary_provider.dal.DictionaryDAO;
import com.nutresa.exemplary_provider.dal.TranslationDAO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.DictionaryDTO;
import com.nutresa.exemplary_provider.dtl.TranslationDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TranslationBLO extends GenericBLO<TranslationDTO, TranslationDAO> {

    private static TranslationBLO instance = null;
    private Map<String, HashMap<String, String>> translationTable = new HashMap<String, HashMap<String, String>>();
    private Map<String, HashMap<String, String>> dictionaryTable = new HashMap<String, HashMap<String, String>>();
    private static final Translator cleanTranslator = new Translator();
    private static final String DEFAULT_LANGUAGE = "es";
    private String language = DEFAULT_LANGUAGE;

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

    protected void loadDictionary(String component) throws HandlerGenericException {
        Map<String, String> filter = new HashMap<String, String>();
        DictionaryDAO dictionaryDAO = new DictionaryDAO();

        filter.put("component", component);
        List<DictionaryDTO> listDictionary = dictionaryDAO.getAllBy(filter);

        HashMap<String, String> componentDictionary = new HashMap<String, String>();
        for (DictionaryDTO itemDictionary : listDictionary) {
            componentDictionary.put(itemDictionary.getName(), itemDictionary.getLabel());
        }
        dictionaryTable.put(component, componentDictionary);
    }

    public Translator getTranslator(String language, String entity) {
        if (!translationTable.containsKey(language + "_" + entity)) {
            try {
                loadTranslation(language, entity);
            } catch (HandlerGenericException exception) {
                LogBLO.logError("Translation", "Error loading translator to " + entity, exception);
            }
        }
        return new Translator(translationTable.get(language + "_" + entity));
    }

    public Translator getTranslator() {
        return cleanTranslator;
    }

    public Dictionary getDictionary(String component) {
        if (!dictionaryTable.containsKey(component)) {
            try {
                loadDictionary(component);
            } catch (HandlerGenericException exception) {
                LogBLO.logError("Translation", "Error loading dictionary to " + component, exception);
            }
        }
        return new Dictionary(dictionaryTable.get(component));
    }

    public String setLanguage(String language) {
        language = language.toLowerCase();
        if (null != language && ("en".equals(language) || "es".equals(language))) {
            this.language = language;
        } else {
            this.language = DEFAULT_LANGUAGE;
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
        dictionaryTable = new HashMap<String, HashMap<String, String>>();
    }

    public String getClientLanguage(Map<String, String> parameters, Locale locale, Cookie[] cookies) {
        String clientLanguage = null;
        String response = null;

        if (parameters.containsKey(TranslationDAO.PARAMETER_NAME)) {
            clientLanguage = parameters.get(TranslationDAO.PARAMETER_NAME);
            if (!parameters.containsValue("setLanguage")) {
                parameters.remove(TranslationDAO.PARAMETER_NAME);
            }
        } else {
            String cookieLanguage = getCookeLanguageValue(cookies);
            if (null != cookieLanguage) {
                clientLanguage = cookieLanguage;
            }
        }
        if (null == clientLanguage) {
            response = clientLanguage = locale.getLanguage();
        }
        clientLanguage = setLanguage(clientLanguage);
        return clientLanguage.equals(response) ? response : null;
    }

    private String getCookeLanguageValue(Cookie[] cookies) {
        String cookieValue = null;
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                if (TranslationDAO.COOKIE_NAME.equalsIgnoreCase(cookie.getName())) {
                    cookieValue = cookie.getValue();
                    break;
                }
            }
        }
        return cookieValue;
    }

    public Map<String, List<String>> getMastersWithFieldsToTranslate() {
        Map<String, List<String>> mastersWithFields = new HashMap<String, List<String>>();
        mastersWithFields.putAll(CompanySizeBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(CompanyTypeBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(CategoryBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(SubCategoryBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(SocietyTypeBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(SectorBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(DimensionBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(CriterionBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(CountryBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(DepartmentBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(CityBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(SupplyBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(QuestionBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(OptionBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(SystemBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(MenuBLO.getEntityWithFieldsToTranslate());
        mastersWithFields.putAll(StateBLO.getEntityWithFieldsToTranslate());
        return mastersWithFields;
    }

    /**
     * @param entityId  Documento a traducido
     * @param language  Idioma
     * @param fieldName Nombre del campo traducido
     * @return Registro traducido a el idioma especificado
     * @throws HandlerGenericException
     */
    public TranslationDTO getByEntityIdAndLanguage(String entityId, String language, String fieldName)
            throws HandlerGenericException {
        TranslationDAO translationDAO = new TranslationDAO();
        return translationDAO.getByEntityIdAndLanguage(entityId, language, fieldName);

    }

    public static class Translator {

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

    public static class Dictionary {

        private HashMap<String, String> dictionaries = null;

        protected Dictionary(HashMap<String, String> dictionary) {
            this.dictionaries = dictionary;
        }

        public boolean isEmpty() {
            return null == dictionaries || dictionaries.size() == 0;
        }

        public boolean hasTranslation(String name) {
            return !isEmpty() && dictionaries.containsKey(name);
        }

        public String get(String name) {
            return hasTranslation(name) ? dictionaries.get(name) : name;
        }

    }

}
