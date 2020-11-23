package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.CriterionPercentBLO;
import com.nutresa.exemplary_provider.dtl.CriterionPercentDTO;

public class CriterionPercentAPI extends GenericAPI<CriterionPercentDTO, CriterionPercentBLO> {

    public CriterionPercentAPI() {
        super(CriterionPercentDTO.class, CriterionPercentBLO.class);
    }

}