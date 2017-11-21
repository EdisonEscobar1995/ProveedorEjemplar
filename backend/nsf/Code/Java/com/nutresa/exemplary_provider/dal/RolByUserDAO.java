package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.RolByUserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class RolByUserDAO extends GenericDAO<RolByUserDTO> {
    public RolByUserDAO() {
        super(RolByUserDTO.class);
        this.entityView = "vwRolsByUser";
    }

    public List<RolByUserDTO> getUsersByRol(String idRol) throws HandlerGenericException {
        List<RolByUserDTO> usersByRol = new ArrayList<RolByUserDTO>();
        try {
            View currentView = getDatabase().getView("vwRolIdsByUsers");
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
