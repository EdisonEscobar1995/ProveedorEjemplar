package com.nutresa.app.exemplary_provider.dal;

import com.nutresa.app.exemplary_provider.dtl.CategoryDTO;

public class CategoryDAO extends GenericDAO<CategoryDTO>{
    public CategoryDAO() {
        super(CategoryDTO.class);
        this.viewName = "vwDevIds";
    }
}
