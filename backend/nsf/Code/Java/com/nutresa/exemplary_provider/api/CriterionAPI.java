package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.CriterionBLO;
import com.nutresa.exemplary_provider.dtl.CriterionDTO;

public class CriterionAPI extends GenericAPI<CriterionDTO, CriterionBLO> {

    public CriterionAPI() {
        super(CriterionDTO.class, CriterionBLO.class);
    }

}