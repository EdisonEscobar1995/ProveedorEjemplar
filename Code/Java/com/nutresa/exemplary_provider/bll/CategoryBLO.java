package com.nutresa.exemplary_provider.bll;

import java.lang.reflect.InvocationTargetException;

import com.nutresa.exemplary_provider.dal.CategoryDAO;
import com.nutresa.exemplary_provider.dtl.CategoryDTO;

public class CategoryBLO extends GenericBLO<CategoryDTO, CategoryDAO> {

    public CategoryBLO() {
        super(CategoryDAO.class);
    }

    @Override
    public CategoryDTO save(CategoryDTO dto) throws IllegalAccessException,
    InstantiationException, NoSuchMethodException,
    InvocationTargetException {
        CategoryDAO dao = new CategoryDAO();
        dto = dao.save(dto);
        if (dto.getSubCategories() != null) {
            SubCategoryBLO subCategory = new SubCategoryBLO();
            dto.setSubCategories(subCategory.saveList(dto.getSubCategories()));
        }
        return dto;
    }

}
