package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.UserByRolBLO;
import com.nutresa.exemplary_provider.dtl.UserByRolDTO;

public class UserByRolAPI extends GenericAPI<UserByRolDTO, UserByRolBLO> {

    public UserByRolAPI() {
        super(UserByRolDTO.class, UserByRolBLO.class);
    }

}