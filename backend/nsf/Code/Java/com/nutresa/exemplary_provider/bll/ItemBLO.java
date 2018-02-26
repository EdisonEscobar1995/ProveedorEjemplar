package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.ItemDAO;
import com.nutresa.exemplary_provider.dtl.ItemDTO;

public class ItemBLO extends GenericBLO<ItemDTO, ItemDAO> {

    public ItemBLO() {
        super(ItemDAO.class);
    }

}
