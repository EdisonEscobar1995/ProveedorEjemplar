package com.nutresa.exemplary_provider.bll;

import java.util.List;

import com.nutresa.exemplary_provider.dal.UserByRolDAO;
import com.nutresa.exemplary_provider.dtl.UserByRolDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class UserByRolBLO extends GenericBLO<UserByRolDTO, UserByRolDAO> {
    public UserByRolBLO() {
        super(UserByRolDAO.class);
    }

    public List<UserByRolDTO> getUserByRol(String idRol) throws HandlerGenericException {
        UserByRolDAO dao = new UserByRolDAO();
        List<UserByRolDTO> usersByRol = null;
        try {
            usersByRol = dao.getUsersByRol(idRol);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return usersByRol;
    }
}