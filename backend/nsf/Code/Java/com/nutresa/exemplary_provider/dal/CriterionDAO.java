package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.CriterionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CriterionDAO extends GenericDAO<CriterionDTO> {

    public CriterionDAO() {
        super(CriterionDTO.class);
        loadTranslator();
    }

    public List<CriterionDTO> getByProperties(List<String> filter) throws HandlerGenericException {
        List<CriterionDTO> criterion = new ArrayList<CriterionDTO>();
        View currentView = getDatabase().getView("vwCriterionByNameAndIdDimension");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            for (Document document : documents) {
                criterion.add(castDocument(document));
            }
        }

        return criterion;
    }

}
