package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.CriterionDTO;

public class CriterionDAO extends GenericDAO<CriterionDTO> {

    public CriterionDAO() {
        super(CriterionDTO.class);
        translatable = true;
    }

}
