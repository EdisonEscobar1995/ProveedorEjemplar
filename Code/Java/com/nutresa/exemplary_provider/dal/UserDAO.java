package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.UserDTO;

public class UserDAO extends GenericDAO<UserDTO> {
    public UserDAO() {
        super(UserDTO.class);
    }

    public UserDTO getByName(String name) {
        return getByView(name, "vwUsersByName");
    }

}
