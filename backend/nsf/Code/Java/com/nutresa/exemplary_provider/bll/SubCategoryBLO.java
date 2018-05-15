package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SubCategoryDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.SubCategoryDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SubCategoryBLO extends GenericBLO<SubCategoryDTO, SubCategoryDAO> {

    public SubCategoryBLO() {
        super(SubCategoryDAO.class);
    }

    public List<SubCategoryDTO> getByIdCategory(String idCategory) throws HandlerGenericException {
        SubCategoryDAO subCategoryDAO = new SubCategoryDAO();
        if (null == idCategory || idCategory.isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return subCategoryDAO.getByIdCategory(idCategory);
    }

    @Override
    public SubCategoryDTO save(SubCategoryDTO subCategory) throws HandlerGenericException {
        SubCategoryDTO response = null;

        if (null != subCategory.getName() && null != subCategory.getIdCategory()) {
            if (existSubCategory(subCategory)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(subCategory);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private boolean existSubCategory(SubCategoryDTO subCategory) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(subCategory.getIdCategory());
        filter.add(subCategory.getName());

        String idItem = subCategory.getId();
        String temporalIdentifier = subCategory.getName().trim().toUpperCase().concat(subCategory.getIdCategory());

        SubCategoryDAO subCategoryDAO = new SubCategoryDAO();
        List<SubCategoryDTO> existingSubCategories = subCategoryDAO.getByProperties(filter);

        if (!existingSubCategories.isEmpty()) {
            SubCategoryDTO existingSubCategory = existingSubCategories.get(0);

            String idItemExisting = existingSubCategory.getId();
            String temporalIdentifierExisting = existingSubCategory.getName().trim().toUpperCase()
                    .concat(existingSubCategory.getIdCategory());

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

    protected static Map<String, List<String>> getEntityWithFieldsToTranslate() {
        Map<String, List<String>> entityWithFields = new HashMap<String, List<String>>();
        List<String> fields = new ArrayList<String>();
        fields.add("name");
        entityWithFields.put("SubCategory", fields);
        return entityWithFields;
    }
}
