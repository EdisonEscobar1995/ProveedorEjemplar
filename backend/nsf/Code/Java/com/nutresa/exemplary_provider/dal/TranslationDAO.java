package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.TranslationDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TranslationDAO extends GenericDAO<TranslationDTO> {

    public static final String COOKIE_NAME = "language";

    public static final String PARAMETER_NAME = COOKIE_NAME;

    public TranslationDAO() {
        super(TranslationDTO.class);
    }

    /**
     * @param entityId
     *            Documento a traducido
     * @param language
     *            Idioma
     * @param fieldName
     *            Nombre del campo traducido
     * @return Registro traducido a el idioma especificado
     * @throws HandlerGenericException
     */
    public TranslationDTO getByEntityIdAndLanguage(String entityId, String language, String fieldName)
            throws HandlerGenericException {
        TranslationDTO translation = new TranslationDTO();
        List<String> filter = new ArrayList<String>();
        filter.add(entityId);
        filter.add(language);
        filter.add(fieldName);
        View currentView = getDatabase().getView("vwTranslationsByEntityIdAndLanguageAndField");
        Document document = currentView.getFirstDocumentByKey(filter, true);
        if (null != document) {
            translation = castDocument(document);
        }

        return translation;
    }

}
