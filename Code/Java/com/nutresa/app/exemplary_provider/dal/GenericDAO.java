package com.nutresa.app.exemplary_provider.dal;

import java.lang.reflect.Field;
import java.util.ArrayList;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.Session;
import org.openntf.domino.View;
import org.openntf.domino.utils.Factory;
import org.openntf.domino.ViewEntryCollection;
import org.openntf.domino.ViewEntry;

public abstract class GenericDAO<T>{

	private Session session;
	private Database database;
	private Class<T> daoClass;
	protected String viewName;
	
	public GenericDAO(Class<T> daoClass) {
		this.session = Factory.getSession();
		this.database = session.getCurrentDatabase();
		this.daoClass = daoClass;
	}
	
	@SuppressWarnings("hiding")
	public <T> T get(String id){
		View currentView = database.getView(this.viewName);
		Document document = currentView.getFirstDocumentByKey(id,true);
		return castDocument(document);
	}
	
	@SuppressWarnings("unchecked")
	public ArrayList<T> getAll() throws IllegalAccessException {		
		View view = database.getView(this.viewName);
		ViewEntryCollection vec = view.getAllEntries();
		Document document;
		ArrayList<T> list = new ArrayList<T>();
		for(ViewEntry viewEntry : vec){
			document = viewEntry.getDocument();
			list.add((T) this.castDocument(document));
		}
		return list;
	}
	
	@SuppressWarnings({"hiding","unchecked"})
	public <T> T castDocument(Document document) {
		T result = null;
		try {
			if(document != null){
				result = (T) this.daoClass.newInstance();
				for(Field field : this.daoClass.getDeclaredFields()){					
					field.setAccessible(true);
					field.set(result,document.getItemValue(field.getName(), field.getType()));
				}
			}
		} catch (IllegalAccessException exception) {
			exception.printStackTrace();
		} catch (InstantiationException exception) {
			exception.printStackTrace();
		}
		return result;
	}
	
	public void save(T dto) throws IllegalAccessException {
		Document document = database.createDocument();
		this.saveDocument(document, dto);
	}
	
	private void saveDocument(Document document, T dto) throws IllegalArgumentException, IllegalAccessException{		
		for(Field field : this.daoClass.getDeclaredFields()){
			field.setAccessible(true);
			document.replaceItemValue(field.getName(), field.get(dto));
		}
		document.save(true,false);
	}
	
	public void update(T dto, String id) throws IllegalAccessException {		
		View vw = database.getView(this.viewName);
		Document document = vw.getFirstDocumentByKey(id,true);
		if(document != null){
			this.saveDocument(document,dto);
		}		
	}	
	
	public void delete(String id) throws IllegalAccessException {		
		View view = database.getView(this.viewName);
		Document document = view.getFirstDocumentByKey(id,true);
		if(document != null){
			document.remove(true);
		}
	}
}
