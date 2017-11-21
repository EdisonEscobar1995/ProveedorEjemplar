package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.UserByRolDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class UserByRolDAO extends GenericDAO<UserByRolDTO> {
    public UserByRolDAO() {
        super(UserByRolDTO.class);
    }

    public List<UserByRolDTO> getUsersByRol(String idRol) throws HandlerGenericException {
        List<UserByRolDTO> usersByRol = new ArrayList<UserByRolDTO>();
        try {
            View currentView = getDatabase().getView("vwUsersByIdRol");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idRol, true);
            for (Document document : documents) {
                usersByRol.add(castDocument(document));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return usersByRol;
    }

}
