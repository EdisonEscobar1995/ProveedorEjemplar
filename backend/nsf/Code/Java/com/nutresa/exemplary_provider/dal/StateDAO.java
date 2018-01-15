package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.StateDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class StateDAO extends GenericDAO<StateDTO> {

    public StateDAO() {
        super(StateDTO.class);
    }

    public StateDTO getStateByShortName(String shortName) throws HandlerGenericException {
        StateDTO response = null;
        try {
            View view = getDatabase().getView("vwStatesByShortName");
            Document document = view.getFirstDocumentByKey(shortName, true);
            response = castDocument(document);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

}
