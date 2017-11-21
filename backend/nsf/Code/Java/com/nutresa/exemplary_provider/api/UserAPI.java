package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.UserBLO;
import com.nutresa.exemplary_provider.dtl.UserDTO;

public class UserAPI extends GenericAPI<UserDTO, UserBLO> {

    public UserAPI() {
        super(UserDTO.class, UserBLO.class);
    }

}