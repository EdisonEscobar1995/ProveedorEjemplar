package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.SocietyTypeDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SocietyTypeDAO extends GenericDAO<SocietyTypeDTO> {

    public SocietyTypeDAO() {
        super(SocietyTypeDTO.class);
        loadTranslator();
    }

    public List<SocietyTypeDTO> getByProperties(List<String> filter) throws HandlerGenericException {
        List<SocietyTypeDTO> societyType = new ArrayList<SocietyTypeDTO>();
        View currentView = getDatabase().getView("vwSocietyTypesByName");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            for (Document document : documents) {
                societyType.add(castDocument(document));
            }
        }

        return societyType;
    }

}
