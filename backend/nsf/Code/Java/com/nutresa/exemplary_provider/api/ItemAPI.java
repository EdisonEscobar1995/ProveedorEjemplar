package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.ItemBLO;
import com.nutresa.exemplary_provider.dtl.ItemDTO;

public class ItemAPI extends GenericAPI<ItemDTO, ItemBLO> {
    public ItemAPI() {
        super(ItemDTO.class, ItemBLO.class);
    }
}
