package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.CategoryDAO;
import com.nutresa.exemplary_provider.dtl.CategoryDTO;

public class CategoryBLO extends GenericBLO<CategoryDTO, CategoryDAO> {

	public CategoryBLO() {
		super(CategoryDAO.class);
	}

}
