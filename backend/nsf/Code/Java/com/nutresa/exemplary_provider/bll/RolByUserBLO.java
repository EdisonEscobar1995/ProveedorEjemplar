package com.nutresa.exemplary_provider.bll;

import java.util.List;

import com.nutresa.exemplary_provider.dal.RolByUserDAO;
import com.nutresa.exemplary_provider.dtl.RolByUserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class RolByUserBLO extends GenericBLO<RolByUserDTO, RolByUserDAO> {
    public RolByUserBLO() {
        super(RolByUserDAO.class);
    }

    public List<RolByUserDTO> getUserByRol(String idRol) throws HandlerGenericException {
        RolByUserDAO dao = new RolByUserDAO();
        List<RolByUserDTO> usersByRol = null;
        try {
            usersByRol = dao.getUsersByRol(idRol);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return usersByRol;
    }
}