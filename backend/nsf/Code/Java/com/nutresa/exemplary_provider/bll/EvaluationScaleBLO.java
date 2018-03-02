package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.EvaluationScaleDAO;
import com.nutresa.exemplary_provider.dtl.EvaluationScaleDTO;

public class EvaluationScaleBLO extends GenericBLO<EvaluationScaleDTO, EvaluationScaleDAO> {

    public EvaluationScaleBLO() {
        super(EvaluationScaleDAO.class);
    }
}
