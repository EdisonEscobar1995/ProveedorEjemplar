package com.nutresa.exemplary_provider.bll;

import java.util.List;

import com.nutresa.exemplary_provider.dal.CategoryDAO;
import com.nutresa.exemplary_provider.dtl.CategoryDTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CategoryBLO extends GenericBLO<CategoryDTO, CategoryDAO> {

    public CategoryBLO() {
        super(CategoryDAO.class);
    }

    @Override
    public CategoryDTO save(CategoryDTO category) throws HandlerGenericException {
        CategoryDAO dao = new CategoryDAO();
        try {
            category = dao.save(category);
            if (null != category.getSubCategories()) {
                SubCategoryBLO subCategory = new SubCategoryBLO();
                category.setSubCategories(subCategory.saveList(category.getSubCategories(), "id" + dao.getEntity(),
                        category.getId()));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return category;
    }

    public List<CategoryDTO> getByIdSupply(String idSupply) throws HandlerGenericException {
        CategoryDAO categoryDAO = new CategoryDAO();
        if (null == idSupply || idSupply.isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return categoryDAO.getByIdSupply(idSupply);
    }

}
