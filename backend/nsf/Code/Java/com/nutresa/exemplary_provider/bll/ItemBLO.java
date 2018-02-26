package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.ItemDAO;
import com.nutresa.exemplary_provider.dtl.ItemDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ItemBLO extends GenericBLO<ItemDTO, ItemDAO> {

    public ItemBLO() {
        super(ItemDAO.class);
    }

    @Override
    public ItemDTO save(ItemDTO item) throws HandlerGenericException {
        ItemDTO response = null;
        if (existItemByService(item.getIdService(), item.getName())) {
            throw new HandlerGenericException("DOCUMENT_EXISTS");
        } else {
            response = super.save(item);
        }

        return response;
    }

    private boolean existItemByService(String idService, String nameItem) throws HandlerGenericException {
        boolean existItem = false;
        ItemDAO itemDAO = new ItemDAO();
        nameItem = nameItem.trim();
        ItemDTO item = itemDAO.getByServiceAndNameItem(idService, nameItem);

        if (!item.getId().isEmpty()) {
            existItem = true;
        }

        return existItem;
    }

}
