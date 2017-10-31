package Nutresa.ExemplaryProvider.DAL;

import java.lang.reflect.Field;
import java.util.ArrayList;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.Session;
import org.openntf.domino.View;
import org.openntf.domino.utils.Factory;
import org.openntf.domino.ViewEntryCollection;
import org.openntf.domino.ViewEntry;


public abstract class GenericFactory<T>{

	private Session session;
	private Database db;
	private Class<T> mClass;
	protected String viewName;
	
	public GenericFactory(Class<T> mClass) {
		this.session = Factory.getSession();
		this.db = session.getCurrentDatabase();
		this.mClass = mClass;
	}
	
	@SuppressWarnings("hiding")
	public <T> T get(String id){
		View currentView = db.getView(this.viewName);
		Document document = currentView.getFirstDocumentByKey(id,true);
		return castDocument(document);
	}
	
	@SuppressWarnings({"hiding","unchecked"})
	public <T> T castDocument(Document document) {
		T result = null;
		try {
			result = (T) this.mClass.newInstance();
			if(document != null){
				for(Field f : this.mClass.getDeclaredFields()){					
					f.setAccessible(true);
					f.set(result,document.getItemValue(f.getName(), f.getType()));
				}
			}
		} catch (IllegalAccessException e1) {
			e1.printStackTrace();
		} catch (InstantiationException e1) {
			e1.printStackTrace();
		}
		return result;
	}
	
	public void save(T dto) throws IllegalAccessException {
		Document document = db.createDocument();
		this.saveDocument(document, dto);
	}
	
	public void update(T dto, String id) throws IllegalAccessException {		
		View vw = db.getView(this.viewName);
		Document document = vw.getFirstDocumentByKey(id,true);
		if(document != null){
			this.saveDocument(document,dto);
		}		
	}
	private void saveDocument(Document document, T dto) throws IllegalArgumentException, IllegalAccessException{		
		for(Field f : this.mClass.getDeclaredFields()){
			f.setAccessible(true);
			document.replaceItemValue(f.getName(), f.get(dto));
		}
		document.save(true,false);
	}
	
	public void delete(String id) throws IllegalAccessException {		
		View vw = db.getView(this.viewName);
		Document document = vw.getFirstDocumentByKey(id,true);
		if(document != null){
			document.remove(true);
		}
	}
	
	@SuppressWarnings("unchecked")
	public ArrayList<T> get() throws IllegalAccessException {		
		View vw = db.getView(this.viewName);
		ViewEntryCollection vec = vw.getAllEntries();
		Document document;
		ArrayList<T> list = new ArrayList<T>();
		for(ViewEntry ve : vec){
			document = ve.getDocument();
			list.add((T) this.castDocument(document));
		}
		return list;
	}
}
