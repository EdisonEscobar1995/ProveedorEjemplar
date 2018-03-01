package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.ItemBLO;
import com.nutresa.exemplary_provider.dtl.ItemDTO;

public class ItemAPI extends GenericAPI<ItemDTO, ItemBLO> {
    public ItemAPI() {
        super(ItemDTO.class, ItemBLO.class);
    }

    public ServletResponseDTO<List<ItemDTO>> getCriterionBySurvey(Map<String, String> parameters) {
        ItemBLO itemBLO = new ItemBLO();
        ServletResponseDTO<List<ItemDTO>> response = null;
        try {
            response = new ServletResponseDTO<List<ItemDTO>>((List<ItemDTO>) ItemBLO
                    .getByIdService(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<ItemDTO>>(exception);
        }

        return response;
    }
}
