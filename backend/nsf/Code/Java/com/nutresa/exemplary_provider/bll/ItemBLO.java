package com.nutresa.exemplary_provider.bll;

import java.util.List;
import java.util.Map;

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

        if (null != item.getIdService() && !item.getIdService().trim().isEmpty() && null != item.getName()
                && !item.getName().trim().isEmpty()) {
            if (existItemByService(item)) {
                throw new HandlerGenericException("DOCUMENT_EXISTS");
            } else {
                response = super.save(item);
            }
        } else {
            throw new HandlerGenericException("UNEXPECTED_VALUE");
        }

        return response;
    }

    private boolean existItemByService(ItemDTO item) throws HandlerGenericException {
        boolean existItem = false;

        String idItem = item.getId();
        String idService = item.getIdService();
        String nameItem = item.getName().trim();

        ItemDAO itemDAO = new ItemDAO();
        ItemDTO itemExisting = itemDAO.getByServiceAndNameItem(idService, nameItem);

        String idItemExisting = itemExisting.getId();
        String nameItemExisting = itemExisting.getName();

        if ((null == idItem || idItem.isEmpty())
                && (null != nameItemExisting && nameItem.equalsIgnoreCase(nameItemExisting))) {
            existItem = true;
        } else {
            if (null != idItem && null != idItemExisting && !idItem.equals(idItemExisting)
                    && nameItem.equalsIgnoreCase(nameItemExisting)) {
                existItem = true;
            }
        }

        return existItem;
    }

    public List<ItemDTO> getByIdService(Map<String, String> parameters) throws HandlerGenericException {
        ItemDAO itemDAO = new ItemDAO();
        String idService = parameters.get("idService");
        if (null != idService) {
            List<ItemDTO> response = itemDAO.getByIdService(idService);
            if (response.isEmpty()) {
                throw new HandlerGenericException("INFORMATION_NOT_FOUND");
            }
        } else {
            throw new HandlerGenericException("UNEXPECTED_VALUE");
        }

        return response;
    }

}
