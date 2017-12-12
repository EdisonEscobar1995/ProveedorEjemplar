package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.DictionaryDAO;
import com.nutresa.exemplary_provider.dtl.DictionaryDTO;

public class DictionaryBLO extends GenericBLO<DictionaryDTO, DictionaryDAO> {

    public DictionaryBLO() {
        super(DictionaryDAO.class);
    }

}
