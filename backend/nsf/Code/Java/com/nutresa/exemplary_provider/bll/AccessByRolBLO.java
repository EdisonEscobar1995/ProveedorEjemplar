package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.AccessByRolDAO;
import com.nutresa.exemplary_provider.dtl.AccessByRolDTO;

public class AccessByRolBLO extends GenericBLO<AccessByRolDTO, AccessByRolDAO> {
    public AccessByRolBLO() {
        super(AccessByRolDAO.class);
    }
}
