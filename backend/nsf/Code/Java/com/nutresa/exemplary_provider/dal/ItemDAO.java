package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.ItemDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ItemDAO extends GenericDAO<ItemDTO> {

    public ItemDAO() {
        super(ItemDTO.class);
    }

    public ItemDTO getByServiceAndNameItem(String idService, String nameItem) throws HandlerGenericException {
        ItemDTO response = null;
        List<String> filter = new ArrayList<String>();
        filter.add(idService);
        filter.add(nameItem);

        View view = getDatabase().getView("vwItemsByServiceAndNameItem");
        Document document = view.getFirstDocumentByKey(filter, true);
        if (null != document) {
            response = castDocument(document);
        } else {
            response = new ItemDTO();
        }

        return response;
    }

    public List<ItemDTO> getByIdService(String idService) throws HandlerGenericException {
        List<ItemDTO> response = new ArrayList<ItemDTO>();
        View view = getDatabase().getView("vwItemsByIdService");
        DocumentCollection documents = view.getAllDocumentsByKey(idService, true);

        if (null != documents) {
            for (Document document : documents) {
                response.add(castDocument(document));
            }
        }

        return response;
    }

}
