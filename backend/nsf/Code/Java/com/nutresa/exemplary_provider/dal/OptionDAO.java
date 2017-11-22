package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.OptionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class OptionDAO extends GenericDAO<OptionDTO> {
    public OptionDAO() {
        super(OptionDTO.class);
    }

    public List<OptionDTO> getOptionsByQuestion(String idQuestion) throws HandlerGenericException {
        List<OptionDTO> response = new ArrayList<OptionDTO>();
        try {
            View currentView = getDatabase().getView("vwOptionsByQuestion");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idQuestion, true);
            for (Document document : documents) {
                response.add(castDocument(document));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

}
