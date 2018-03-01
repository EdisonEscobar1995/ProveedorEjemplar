package com.nutresa.exemplary_provider.api;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.bll.ItemBLO;
import com.nutresa.exemplary_provider.dtl.ItemDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ItemAPI extends GenericAPI<ItemDTO, ItemBLO> {
    public ItemAPI() {
        super(ItemDTO.class, ItemBLO.class);
    }

    public ServletResponseDTO<List<ItemDTO>> getCriterionBySurvey(Map<String, String> parameters) {
        ItemBLO itemBLO = new ItemBLO();
        ServletResponseDTO<List<ItemDTO>> response = null;
        try {
            response = new ServletResponseDTO<List<ItemDTO>>((List<ItemDTO>) itemBLO
                    .getByIdService(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<ItemDTO>>(exception);
        }

        return response;
    }
}
