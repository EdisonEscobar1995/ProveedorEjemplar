package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.CategoryDAO;
import com.nutresa.exemplary_provider.dtl.CategoryDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CategoryBLO extends GenericBLO<CategoryDTO, CategoryDAO> {

    public CategoryBLO() {
        super(CategoryDAO.class);
    }

    @Override
    public CategoryDTO save(CategoryDTO dto) throws HandlerGenericException {
        CategoryDAO dao = new CategoryDAO();
        try {
            dto = dao.save(dto);
            if (dto.getSubCategories() != null) {
                SubCategoryBLO subCategory = new SubCategoryBLO();
                dto.setSubCategories(subCategory.saveList(dto.getSubCategories(), "id" + dao.getEntity(), dto.getId()));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return dto;
    }

}
