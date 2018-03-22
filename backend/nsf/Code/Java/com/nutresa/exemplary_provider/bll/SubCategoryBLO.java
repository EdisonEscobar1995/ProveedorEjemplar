package com.nutresa.exemplary_provider.bll;

import java.util.List;

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
}
