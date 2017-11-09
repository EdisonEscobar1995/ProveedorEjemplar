package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.CategoryDAO;
import com.nutresa.exemplary_provider.dtl.CategoryDTO;

public class CategoryBLO extends GenericBLO<CategoryDTO, CategoryDAO> {

	public CategoryBLO() {
		super(CategoryDAO.class);
	}
	
	@Override
	public CategoryDTO save(CategoryDTO dto) throws Exception {
	    CategoryDAO dao = new CategoryDAO();
        dto = dao.save(dto);
        //SubCategoryBLO subCategory = new SubCategoryBLO();
        // subCategory.saveList(dto.getSubCategories());
        // TODO respuesta de dto
        return dto;
	}

}
