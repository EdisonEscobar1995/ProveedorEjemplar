package com.nutresa.app.exemplary_provider.dal;

import com.nutresa.app.exemplary_provider.dtl.CategoryDTO;

public class CategoryDAO extends GenericDAO<CategoryDTO>{
    @SuppressWarnings("static-access")
	public CategoryDAO() {
        super(CategoryDTO.class);
    	this.viewAll = "vwCategories";
    }
}
