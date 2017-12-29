package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.SystemDTO;

public class SystemDAO extends GenericDAO<SystemDTO> {

    public SystemDAO() {
        super(SystemDTO.class);
        loadTranslator();
    }
}
