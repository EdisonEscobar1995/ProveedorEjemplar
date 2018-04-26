package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.CategoryDAO;
import com.nutresa.exemplary_provider.dtl.CategoryDTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CategoryBLO extends GenericBLO<CategoryDTO, CategoryDAO> {

    public CategoryBLO() {
        super(CategoryDAO.class);
    }

    public List<CategoryDTO> getByIdSupply(String idSupply) throws HandlerGenericException {
        CategoryDAO categoryDAO = new CategoryDAO();
        if (null == idSupply || idSupply.isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return categoryDAO.getByIdSupply(idSupply);
    }

    @Override
    public CategoryDTO save(CategoryDTO category) throws HandlerGenericException {
        CategoryDTO response = null;

        if (null != category.getName() && null != category.getIdSupply()) {
            if (existCategory(category)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(category);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private boolean existCategory(CategoryDTO category) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(category.getIdSupply());
        filter.add(category.getName());

        String idItem = category.getId();
        String temporalIdentifier = category.getName().trim().toUpperCase().concat(category.getIdSupply());

        CategoryDAO categoryDAO = new CategoryDAO();
        List<CategoryDTO> existingCategories = categoryDAO.getByProperties(filter);

        if (!existingCategories.isEmpty()) {
            CategoryDTO existingCategory = existingCategories.get(0);

            String idItemExisting = existingCategory.getId();
            String temporalIdentifierExisting = existingCategory.getName().trim().toUpperCase()
                    .concat(existingCategory.getIdSupply());

            if ((null == idItem || idItem.isEmpty()) && (null != temporalIdentifierExisting
                    && temporalIdentifier.equalsIgnoreCase(temporalIdentifierExisting))) {
                existItem = true;
            } else {
                if (null != idItem && null != idItemExisting && !idItem.equals(idItemExisting)
                        && temporalIdentifier.equalsIgnoreCase(temporalIdentifierExisting)) {
                    existItem = true;
                }
            }
        }

        return existItem;
    }

}
