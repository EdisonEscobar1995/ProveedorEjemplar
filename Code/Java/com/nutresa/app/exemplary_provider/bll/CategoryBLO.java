package com.nutresa.app.exemplary_provider.bll;

import com.nutresa.app.exemplary_provider.dal.CategoryDAO;
import com.nutresa.app.exemplary_provider.dtl.CategoryDTO;

public class CategoryBLO extends GenericBLO<CategoryDTO, CategoryDAO> {

	public CategoryBLO() {
		super(CategoryDAO.class);
	}

}
