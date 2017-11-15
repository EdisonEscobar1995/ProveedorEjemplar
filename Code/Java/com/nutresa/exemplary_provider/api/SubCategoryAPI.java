package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SocietyTypeBLO;
import com.nutresa.exemplary_provider.dtl.SocietyTypeDTO;

public class SubCategoryAPI extends GenericAPI<SocietyTypeDTO, SocietyTypeBLO> {

    public SubCategoryAPI() {
        super(SocietyTypeDTO.class, SocietyTypeBLO.class);
    }

}
