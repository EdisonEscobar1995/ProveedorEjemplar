package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.SupplierByCallSpecialDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierByCallSpecialDAO extends GenericDAO<SupplierByCallSpecialDTO> {

	public SupplierByCallSpecialDAO() {
        super(SupplierByCallSpecialDTO.class);
        this.entityView = "vwSuppliersByCallSpecial";
    }
	
	public List<SupplierByCallSpecialDTO> getSupplierByCallSpecialIdSupplier(String idSupplier) throws HandlerGenericException {
		List<SupplierByCallSpecialDTO> response = new ArrayList<SupplierByCallSpecialDTO>();

        View view = getDatabase().getView("vwSuppliersByCallSpecialByidSupplier");
        Document document = view.getFirstDocumentByKey(idSupplier, true);
        while (document != null) {
        	response.add(castDocument(document));        	
            document = view.getNextDocument(document);
        }

        return response;
    }
}
