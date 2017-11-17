package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.UserDAO;
import com.nutresa.exemplary_provider.dtl.UserDTO;

public class UserBLO extends GenericBLO<UserDTO, UserDAO> {

    public UserBLO() {
        super(UserDAO.class);
    }

    public boolean havePermissions(String name, String action) {
        return true;
    }

    public UserDTO getByName(String name) {
        UserDAO dao = new UserDAO();
        return dao.getByName(name);
    }
    
}