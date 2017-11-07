package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.CategoryDTO;

public class CategoryDAO extends GenericDAO<CategoryDTO>{
    @SuppressWarnings("static-access")
	public CategoryDAO() {
        super(CategoryDTO.class);
    	this.viewAll = "vwCategories";
    }
}
