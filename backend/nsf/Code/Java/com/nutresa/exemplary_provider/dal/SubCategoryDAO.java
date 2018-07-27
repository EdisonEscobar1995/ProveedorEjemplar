package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.SubCategoryDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SubCategoryDAO extends GenericDAO<SubCategoryDTO> {

    public SubCategoryDAO() {
        super(SubCategoryDTO.class);
        this.entityView = "vwSubCategories";
        loadTranslator();
    }

    public List<SubCategoryDTO> getByIdCategory(String idCategory) throws HandlerGenericException {
        List<SubCategoryDTO> subCategories = new ArrayList<SubCategoryDTO>();
        View currentView = getDatabase().getView("vwSubCategoriesByIdCategory");
        DocumentCollection documents = currentView.getAllDocumentsByKey(idCategory, true);
        if (null != documents) {
            for (Document document : documents) {
                subCategories.add(castDocument(document));
            }
        }

        return subCategories;
    }

    public List<SubCategoryDTO> getByProperties(List<String> filter) throws HandlerGenericException {
        List<SubCategoryDTO> subCategory = new ArrayList<SubCategoryDTO>();
        View currentView = getDatabase().getView("vwSubcategoriesByNameAndIdCategory");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            for (Document document : documents) {
                subCategory.add(castDocument(document));
            }
        }

        return subCategory;
    }
}
