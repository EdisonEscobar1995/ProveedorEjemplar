package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SubCategoryBLO;
import com.nutresa.exemplary_provider.dtl.SubCategoryDTO;

public class SubCategoryAPI extends GenericAPI<SubCategoryDTO, SubCategoryBLO> {

    public SubCategoryAPI() {
        super(SubCategoryDTO.class, SubCategoryBLO.class);
    }

}
