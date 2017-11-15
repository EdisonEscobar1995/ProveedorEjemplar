package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.CompanyTypeBLO;
import com.nutresa.exemplary_provider.dtl.CompanyTypeDTO;

public class CompanyTypeAPI extends GenericAPI<CompanyTypeDTO, CompanyTypeBLO> {

    public CompanyTypeAPI() {
        super(CompanyTypeDTO.class, CompanyTypeBLO.class);
    }

}