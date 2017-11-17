package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.AccessDAO;
import com.nutresa.exemplary_provider.dtl.AccessDTO;

public class AccessBLO extends GenericBLO<AccessDTO, AccessDAO> {

    public AccessBLO() {
        super(AccessDAO.class);
    }

}
