package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.DimensionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class DimensionDAO extends GenericDAO<DimensionDTO> {

    public DimensionDAO() {
        super(DimensionDTO.class);
        loadTranslator();
    }

    public List<DimensionDTO> getByProperties(List<String> filter) throws HandlerGenericException {
        List<DimensionDTO> dimension = new ArrayList<DimensionDTO>();
        View currentView = getDatabase().getView("vwDimensionsByName");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            for (Document document : documents) {
                dimension.add(castDocument(document));
            }
        }

        return dimension;
    }

}
