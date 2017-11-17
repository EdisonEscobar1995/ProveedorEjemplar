package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.OptionBLO;
import com.nutresa.exemplary_provider.dtl.OptionDTO;

public class OptionAPI extends GenericAPI<OptionDTO, OptionBLO> {

    public OptionAPI() {
        super(OptionDTO.class, OptionBLO.class);
    }

}