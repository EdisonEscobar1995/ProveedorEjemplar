package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.DictionaryDTO;

public class DictionaryDAO extends GenericDAO<DictionaryDTO> {

    
    public DictionaryDAO() {
        super(DictionaryDTO.class);
        this.entityView = "vwDictionaries";
        loadTranslator();
    }

}
