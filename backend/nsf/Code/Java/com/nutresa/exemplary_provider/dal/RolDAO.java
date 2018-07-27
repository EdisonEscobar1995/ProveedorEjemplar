package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.RolDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class RolDAO extends GenericDAO<RolDTO> {
    public RolDAO() {
        super(RolDTO.class);
    }

    public RolDTO getIdRolByShortName(String shortName) throws HandlerGenericException {
        RolDTO response = null;
        View currentView = getDatabase().getView("vwRolByShortName");
        Document document = currentView.getFirstDocumentByKey(shortName);
        try {
            response = castDocument(document);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }
}
