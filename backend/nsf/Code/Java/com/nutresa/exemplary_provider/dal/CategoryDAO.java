package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.CategoryDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CategoryDAO extends GenericDAO<CategoryDTO> {

    public CategoryDAO() {
        super(CategoryDTO.class);
        entityView = "vwCategories";
        loadTranslator();
    }

    public List<CategoryDTO> getByIdSupply(String idSupply) throws HandlerGenericException {
        List<CategoryDTO> categories = new ArrayList<CategoryDTO>();
        View currentView = getDatabase().getView("vwCategoriesByIdSupply");
        DocumentCollection documents = currentView.getAllDocumentsByKey(idSupply, true);
        if (null != documents) {
            for (Document document : documents) {
                categories.add(castDocument(document));
            }
        }

        return categories;
    }
}
