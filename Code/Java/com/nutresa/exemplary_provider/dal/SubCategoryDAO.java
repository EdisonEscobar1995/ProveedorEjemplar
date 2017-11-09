package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.CategoryDTO;

public class SubCategoryDAO extends GenericDAO<CategoryDTO>{
    
	public SubCategoryDAO() {
        super(CategoryDTO.class);
    	this.entityView = "vwSubCategories";
    }
}
