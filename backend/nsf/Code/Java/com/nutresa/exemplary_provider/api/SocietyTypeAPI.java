package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SocietyTypeBLO;
import com.nutresa.exemplary_provider.dtl.SocietyTypeDTO;

public class SocietyTypeAPI extends GenericAPI<SocietyTypeDTO, SocietyTypeBLO> {

    public SocietyTypeAPI() {
        super(SocietyTypeDTO.class, SocietyTypeBLO.class);
    }

}
