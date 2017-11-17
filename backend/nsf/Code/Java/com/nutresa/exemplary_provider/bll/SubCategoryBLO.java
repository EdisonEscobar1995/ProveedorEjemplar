package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SubCategoryDAO;
import com.nutresa.exemplary_provider.dtl.SubCategoryDTO;

public class SubCategoryBLO extends GenericBLO<SubCategoryDTO, SubCategoryDAO> {

    public SubCategoryBLO() {
        super(SubCategoryDAO.class);
    }
}
