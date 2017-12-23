package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.SubCategoryDTO;

public class SubCategoryDAO extends GenericDAO<SubCategoryDTO> {

    public SubCategoryDAO() {
        super(SubCategoryDTO.class);
        this.entityView = "vwSubCategories";
        loadTranslator();
    }
}
