package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.UserDAO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class UserBLO extends GenericBLO<UserDTO, UserDAO> {

    public UserBLO() {
        super(UserDAO.class);
    }

    public List<UserDTO> getUsersByRol(String idRol) throws HandlerGenericException {
        List<UserDTO> users = new ArrayList<UserDTO>();
        try {
            UserDAO userDAO = new UserDAO();
            users = userDAO.getUsersByRol(idRol);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return users;
    }

}