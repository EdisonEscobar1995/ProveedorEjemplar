package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.DictionaryBLO;
import com.nutresa.exemplary_provider.dtl.DictionaryDTO;

public class DictionaryAPI extends GenericAPI<DictionaryDTO, DictionaryBLO> {

    public DictionaryAPI() {
        super(DictionaryDTO.class, DictionaryBLO.class);
    }

}
