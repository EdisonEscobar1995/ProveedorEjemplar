package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.Session;
import org.openntf.domino.View;
import org.openntf.domino.ext.Name;
import org.openntf.domino.utils.Factory;

import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class UserDAO extends GenericDAO<UserDTO> {
    private static final short MAX_RESULTS = 20;
    public UserDAO() {
        super(UserDTO.class);
    }

    public List<UserDTO> getUsersByRol(String idRol) throws HandlerGenericException {
        List<UserDTO> usersByRol = new ArrayList<UserDTO>();
        View currentView = getDatabase().getView("vwUsersByRol");
        DocumentCollection documents = currentView.getAllDocumentsByKey(idRol, true);
        if (null != documents) {
            for (Document document : documents) {
                usersByRol.add(castDocument(document));
            }
        }

        return usersByRol;
    }

    public UserDTO getUserInSession() throws HandlerGenericException {
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

    public List<UserDTO> searchUser(String text) throws HandlerGenericException {
        List<UserDTO> users = new ArrayList<UserDTO>();
        View vwSystem = getDatabase().getView("vwSystems");
        Document docSystem = vwSystem.getFirstDocumentByKey("frSystem", true);
        Database namesDatabase = getSession().getDatabase(docSystem.getItemValueString("namesPathApplication"));
        View vwNames = namesDatabase.getView("($Users)");
        String query = "(Field type = Person and FIELD fullname CONTAINS ".concat(text.concat("*)"));
        if (null != vwNames) {
            int resultNumber = vwNames.FTSearch(query, MAX_RESULTS);
            if (resultNumber > 0) {
                Document document = vwNames.getFirstDocument();
                while (document != null) {
                    UserDTO user = new UserDTO();
                    user.setName(document.getItemValueString("fullname"));
                    user.setEmail(document.getItemValueString("MailAddress"));
                    users.add(user);
                    document = vwNames.getNextDocument(document);
                }
            }
            vwNames.clear();
        }

        return users;

    }

}
