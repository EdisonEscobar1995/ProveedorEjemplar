package com.nutresa.app.exemplary_provider.api;

import com.nutresa.app.exemplary_provider.bll.CategoryBLO;
import com.nutresa.app.exemplary_provider.dtl.CategoryDTO;

public class CategoryAPI extends GenericAPI<CategoryDTO, CategoryBLO> {

	public CategoryAPI() {
		super(CategoryDTO.class, CategoryBLO.class);
	}

}
