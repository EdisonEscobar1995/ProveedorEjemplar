package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.UserDAO;
import com.nutresa.exemplary_provider.dtl.RolByUserDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class UserBLO extends GenericBLO<UserDTO, UserDAO> {

    public UserBLO() {
        super(UserDAO.class);
    }

    public List<UserDTO> getUsersByRol(String idRol) throws HandlerGenericException {
        List<RolByUserDTO> usersByRol = new ArrayList<RolByUserDTO>();
        RolByUserBLO userByRolBLO = new RolByUserBLO();
        List<UserDTO> users = new ArrayList<UserDTO>();
        try {
            usersByRol = userByRolBLO.getUserByRol(idRol);
            UserDAO userDAO = new UserDAO();
            for (RolByUserDTO userByRolDTO : usersByRol) {
                users.add(userDAO.get(userByRolDTO.getIdUser()));
            }
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return users;
    }

}