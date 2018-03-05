package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.EvaluationScaleDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class EvaluationScaleDAO extends GenericDAO<EvaluationScaleDTO> {

    public EvaluationScaleDAO() {
        super(EvaluationScaleDTO.class);
    }

    public List<EvaluationScaleDTO> getByProperties(List<String> filter) throws HandlerGenericException {
        List<EvaluationScaleDTO> scales = new ArrayList<EvaluationScaleDTO>();
        View currentView = getDatabase().getView("vwEvaluationScalesByUniqueProperties");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            for (Document document : documents) {
                scales.add(castDocument(document));
            }
        }

        return scales;
    }

}
