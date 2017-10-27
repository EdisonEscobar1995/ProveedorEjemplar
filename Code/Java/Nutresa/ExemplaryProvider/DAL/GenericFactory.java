package Nutresa.ExemplaryProvider.DAL;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.Item;
import org.openntf.domino.Name;
import org.openntf.domino.Session;
import org.openntf.domino.View;
import org.openntf.domino.utils.Factory;

public class GenericFactory<T>{

	private Session session;
	private Database db;
	private Document SystemDoc;
	private boolean found;
	private String unid;

	public GenericFactory(String viewName) {
		session = Factory.getSession();
		db = session.getCurrentDatabase();
		BuildDocument(viewName);
	}

	public GenericFactory(String unid, String viewName) {
		session = Factory.getSession();
		db = session.getCurrentDatabase();
		this.unid = unid;
		BuildDocument(viewName);
	}

	public boolean IsFound() {
		return found;
	}

	private void BuildDocument(String viewName) {
		View currentView = db.getView(viewName);
        // SystemDoc = currentView.getFirstDocumentByKey(unid, true);
        // found = SystemDoc != null;
	}

	@SuppressWarnings( { "hiding", "unchecked" })
	public <T> T GetDocument(T dataIn) {
		T result = null;
		try {
			result = (T) dataIn.getClass().newInstance();

			for (Method method : dataIn.getClass().getMethods()) {

				if (Modifier.isPublic(method.getModifiers())
						&& !method.getName().equals("getClass")
						&& (method.getName().startsWith("set") || method
								.getName().startsWith("is"))) {

					String[] parts = method.getName().split("set");
					String propertyName = parts[1];

					method.invoke(result, SystemDoc
							.getItemValueString(propertyName));

				}
			}

		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	@SuppressWarnings("hiding")
	public <T> void CreateDocument(T dataIn) {
		SystemDoc = db.createDocument();
		SystemDoc.replaceItemValue("id", SystemDoc.getUniversalID());
		Name creator = session.createName(session.getEffectiveUserName());
		Item item = SystemDoc.replaceItemValue("creator", creator
				.getCanonical());
		item.setNames(true);

		UpdateDocument(dataIn);
	}

	@SuppressWarnings("hiding")
	public <T> void UpdateDocument(T dataIn) {

		try {

			for (Method method : dataIn.getClass().getMethods()) {

				if (Modifier.isPublic(method.getModifiers())
						&& !method.getName().equals("getClass")
						&& (method.getName().startsWith("get"))) {

					String[] parts = method.getName().split("get");
					String propertyName = parts[1];

					if (!propertyName.toLowerCase().equals("id")) {
						Object Data = method.invoke(dataIn);
						SystemDoc.replaceItemValue(propertyName, Data);
					}
				}
			}

			SystemDoc.save(true, false);

		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
