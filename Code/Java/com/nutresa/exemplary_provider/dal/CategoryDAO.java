package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.CategoryDTO;

public class CategoryDAO extends GenericDAO<CategoryDTO>{
   
	public CategoryDAO() {
        super(CategoryDTO.class);
    	this.entityView = "vwCategories";
    }
}
