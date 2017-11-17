package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.CriterionDAO;
import com.nutresa.exemplary_provider.dtl.CriterionDTO;

public class CriterionBLO extends GenericBLO<CriterionDTO, CriterionDAO> {

    public CriterionBLO() {
        super(CriterionDAO.class);
    }

}
