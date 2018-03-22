package com.nutresa.exemplary_provider.api;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.bll.CategoryBLO;
import com.nutresa.exemplary_provider.dtl.CategoryDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CategoryAPI extends GenericAPI<CategoryDTO, CategoryBLO> {

    public CategoryAPI() {
        super(CategoryDTO.class, CategoryBLO.class);
    }

    public ServletResponseDTO<List<CategoryDTO>> getByIdSupply(Map<String, String> parameters) {
        ServletResponseDTO<List<CategoryDTO>> response = null;
        CategoryBLO categoryBLO = new CategoryBLO();
        try {
            response = new ServletResponseDTO<List<CategoryDTO>>(categoryBLO.getByIdSupply(parameters.get("idSupply")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<CategoryDTO>>(exception);
        }

        return response;
    }

}
