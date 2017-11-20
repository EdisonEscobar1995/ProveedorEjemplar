package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.UserDAO;
import com.nutresa.exemplary_provider.dtl.UserByRolDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class UserBLO extends GenericBLO<UserDTO, UserDAO> {

    public UserBLO() {
        super(UserDAO.class);
    }

    public List<UserDTO> getUsersByRol(String idRol) throws HandlerGenericException {
        List<UserByRolDTO> usersByRol = new ArrayList<UserByRolDTO>();
        UserByRolBLO userByRolBLO = new UserByRolBLO();
        List<UserDTO> users = new ArrayList<UserDTO>();
        try {
            usersByRol = userByRolBLO.getUserByRol(idRol);
            UserDAO userDAO = new UserDAO();
            for (UserByRolDTO userByRolDTO : usersByRol) {
                users.add(userDAO.get(userByRolDTO.getIdUser()));
            }
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return null;
    }

}