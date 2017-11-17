package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.CompanySizeBLO;
import com.nutresa.exemplary_provider.dtl.CompanySizeDTO;

public class CompanySizeAPI extends GenericAPI<CompanySizeDTO, CompanySizeBLO> {

    public CompanySizeAPI() {
        super(CompanySizeDTO.class, CompanySizeBLO.class);
    }

}