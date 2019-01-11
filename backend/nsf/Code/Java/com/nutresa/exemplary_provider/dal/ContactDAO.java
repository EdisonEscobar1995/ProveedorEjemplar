package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.ContactDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ContactDAO extends GenericDAO<ContactDTO>{
    public ContactDAO() {
        super(ContactDTO.class);
    }

    
    
    
    @Override
	public ContactDTO get(String id) throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.get(id);
	}




	@Override
	public List<ContactDTO> getAll() throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAll();
	}




	@Override
	public List<ContactDTO> getAll(String defaultView)
			throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAll(defaultView);
	}




	@Override
	public List<ContactDTO> getAllBy(List<String> key)
			throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAllBy(key);
	}




	@Override
	public List<ContactDTO> getAllBy(Map<String, String> parameters)
			throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAllBy(parameters);
	}




	@Override
	public List<ContactDTO> getAllBy(Map<String, String> parameters,
			String defaultView) throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAllBy(parameters, defaultView);
	}




	@Override
	public List<ContactDTO> getAllBy(String key) throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAllBy(key);
	}




	@Override
	public List<ContactDTO> getAllBy(String field, String value)
			throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAllBy(field, value);
	}




	@Override
	public List<ContactDTO> getAllBy(String field, String value,
			String defaultView) throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAllBy(field, value, defaultView);
	}




	@Override
	public List<DTO> getAllByIds(List<Object> list)
			throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAllByIds(list);
	}




	@Override
	public List<DTO> getAllByIds(List<Object> list, boolean uniqueIds)
			throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAllByIds(list, uniqueIds);
	}




	@Override
	public List<DTO> getAllByIds(String field, List<Object> list)
			throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAllByIds(field, list);
	}




	@Override
	public List<DTO> getAllByIds(String field, List<Object> list,
			boolean uniqueIds) throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getAllByIds(field, list, uniqueIds);
	}




	@Override
	public ContactDTO getBy(List<String> key) throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getBy(key);
	}




	@Override
	public ContactDTO getBy(Map<String, String> parameters)
			throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getBy(parameters);
	}




	@Override
	public ContactDTO getBy(Map<String, String> parameters, String defaultView)
			throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getBy(parameters, defaultView);
	}




	@Override
	public ContactDTO getBy(String key) throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getBy(key);
	}




	@Override
	public ContactDTO getBy(String field, String value)
			throws HandlerGenericException {
		// TODO Auto-generated method stub
		return super.getBy(field, value);
	}




	public List<ContactDTO> getContactsBySupplier(String idSupplier) throws HandlerGenericException {
        List<ContactDTO> contacts = new ArrayList<ContactDTO>();
        try {
            View currentView = getDatabase().getView("vwContactsBySupplier");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idSupplier, true);
            for (Document document : documents) {
            	contacts.add(castDocument(document));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return contacts;
    }
}
