package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.RolDAO;
import com.nutresa.exemplary_provider.dtl.RolDTO;

public class RolBLO extends GenericBLO<RolDTO, RolDAO> {

    public RolBLO() {
        super(RolDAO.class);
    }

}
