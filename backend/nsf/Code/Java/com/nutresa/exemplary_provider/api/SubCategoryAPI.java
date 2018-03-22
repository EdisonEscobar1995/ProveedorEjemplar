package com.nutresa.exemplary_provider.api;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.bll.SubCategoryBLO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SubCategoryDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SubCategoryAPI extends GenericAPI<SubCategoryDTO, SubCategoryBLO> {

    public SubCategoryAPI() {
        super(SubCategoryDTO.class, SubCategoryBLO.class);
    }

    public ServletResponseDTO<List<SubCategoryDTO>> getByIdCategory(Map<String, String> parameters) {
        ServletResponseDTO<List<SubCategoryDTO>> response = null;
        SubCategoryBLO subCategoryBLO = new SubCategoryBLO();
        try {
            response = new ServletResponseDTO<List<SubCategoryDTO>>(subCategoryBLO.getByIdCategory(parameters
                    .get("idCategory")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<SubCategoryDTO>>(exception);
        }

        return response;
    }

}
