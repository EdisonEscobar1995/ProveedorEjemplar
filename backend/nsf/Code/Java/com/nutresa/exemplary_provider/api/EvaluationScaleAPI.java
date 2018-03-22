package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.EvaluationScaleBLO;
import com.nutresa.exemplary_provider.dtl.EvaluationScaleDTO;

public class EvaluationScaleAPI extends GenericAPI<EvaluationScaleDTO, EvaluationScaleBLO> {

    public EvaluationScaleAPI() {
        super(EvaluationScaleDTO.class, EvaluationScaleBLO.class);
    }

}