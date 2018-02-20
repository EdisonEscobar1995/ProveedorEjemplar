package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.Session;
import org.openntf.domino.View;
import org.openntf.domino.ext.Name;
import org.openntf.domino.utils.Factory;

import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class UserDAO extends GenericDAO<UserDTO> {
    public UserDAO() {
        super(UserDTO.class);
    }
    
    public List<UserDTO> getUsersByRol(String idRol) throws HandlerGenericException {
        List<UserDTO> usersByRol = new ArrayList<UserDTO>();
        try {
            View currentView = getDatabase().getView("vwUsersByRol");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idRol, true);
            for (Document document : documents) {
                usersByRol.add(castDocument(document));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return usersByRol;
    }

    public UserDTO getUserInSession() throws HandlerGenericException{
        UserDTO user = null;
        try {
            user = getBy("name", getNameUserInSession());
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return user;
    }
    
    public Name getDominoUser() throws HandlerGenericException {
        Session currSess = Factory.getSession();
        return currSess.createName(currSess.getEffectiveUserName());
    }

    public String getCommonName(String name) throws HandlerGenericException {
        Session currSess = Factory.getSession();
        return currSess.createName(name).getCommon();
    }

}
