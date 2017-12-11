package com.nutresa.exemplary_provider.api;

import java.util.List;

import com.nutresa.exemplary_provider.bll.UserBLO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class UserAPI extends GenericAPI<UserDTO, UserBLO> {

    public UserAPI() {
        super(UserDTO.class, UserBLO.class);
    }

    public ServletResponseDTO<List<DTO>> getRolsByUser() throws HandlerGenericException {
        UserBLO userBLO = new UserBLO();
        return new ServletResponseDTO<List<DTO>>(userBLO.getRolsByUser());
    }
}