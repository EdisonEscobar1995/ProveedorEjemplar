package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CallDAO extends GenericDAO<CallDTO> {

    public CallDAO() {
        super(CallDTO.class);
    }

    public CallDTO getCallActive() throws HandlerGenericException {
        CallDTO call = null;
        View view = getDatabase().getView("vwCallByActive");
        Document document = view.getFirstDocumentByKey("1", true);
        if (null != document) {
            call = castDocument(document);
        }

        return call;
    }
    
    public CallDTO getPrevious(String idCall) throws HandlerGenericException {
    	try {
   			View view = getDatabase().getView("vwCalls");
   			Document document = view.getFirstDocumentByKey(idCall);
    		view = getDatabase().getView("vwCallsByYear");
    		document = view.getFirstDocumentByKey(String.valueOf(document.getItemValueInteger("year")));
    		document = view.getNextSibling(document);
    		return castDocument(document);
    	} catch (Exception exception) {
    		throw new HandlerGenericException(exception);
    	}
    }

}
