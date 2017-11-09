package com.nutresa.exemplary_provider.dal;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.Session;
import org.openntf.domino.View;
import org.openntf.domino.utils.DominoUtils;
import org.openntf.domino.utils.Factory;
import org.openntf.domino.ViewEntryCollection;
import org.openntf.domino.ViewEntry;

import com.nutresa.exemplary_provider.utils.Common;

public abstract class GenericDAO<T> {

    private Session session;
    private Database database;
    private Class<T> dtoClass;
    private static final String VIEW_IDS = "vwDevIds";
    protected static String viewAll;

    public GenericDAO(Class<T> dtoClass) {
        this.session = Factory.getSession();
        this.database = session.getCurrentDatabase();
        this.dtoClass = dtoClass;
    }

    public T get(String id) {
        View currentView = database.getView(VIEW_IDS);
        Document document = currentView.getFirstDocumentByKey(id, true);
        return castDocument(document);
    }

    public List<T> getAll() throws IllegalAccessException {
        View view = database.getView(viewAll);
        ViewEntryCollection vec = view.getAllEntries();
        Document document;
        List<T> list = new ArrayList<T>();
        for (ViewEntry viewEntry : vec) {
            document = viewEntry.getDocument();
            list.add((T) this.castDocument(document));
        }
        return list;
    }

    private T castDocument(Document document) {
        T result = null;
        try {
            if (document != null) {
                result = this.dtoClass.newInstance();
                for (Field field : this.dtoClass.getDeclaredFields()) {
                    field.setAccessible(true);
                    field.set(result, document.getItemValue(field.getName(),
                            field.getType()));
                }
            }
        } catch (IllegalAccessException illegalAccessException) {
            DominoUtils.handleException(new Throwable(illegalAccessException));
        } catch (InstantiationException instantiationException) {
            DominoUtils.handleException(new Throwable(instantiationException));
        }
        return result;
    }

    public T save(T dto) throws IllegalAccessException {
        Document document = database.createDocument();
        return this.saveDocument(document, dto, true);
    }

    public T saveProfile(String form, T dto) throws IllegalAccessException{
        View vw = database.getView(viewAll);
        Document document = vw.getFirstDocumentByKey(form, true);
        if (document == null) {
            dto = this.save(dto);
        } else {
            dto = this.saveDocument(document, dto, false);
        }

        return dto;
    }

    private T saveDocument(Document document, T dto, boolean newDocument)
    throws IllegalAccessException {
        String id = document.getItemValueString("id");
        if (newDocument) {
            id = document.getMetaversalID();
        }

        for (Field field : this.dtoClass.getDeclaredFields()) {
            field.setAccessible(true);
            document.replaceItemValue(field.getName(), field.get(dto));
        }
        
        document.replaceItemValue("id", id);
        if (document.save(true, false)) {
            Field field = Common.getField(dto.getClass(), "id");
            field.set(dto, id);
        } else {
            throw new NullPointerException("Can not save document");
        }

        return dto;
    }

    public T update(String id, T dto) throws IllegalAccessException {
        View vw = database.getView(VIEW_IDS);
        Document document = vw.getFirstDocumentByKey(id, true);
        if (document != null) {
            dto = this.saveDocument(document, dto, false);
        }

        return dto;
    }

    public void delete(String id) throws IllegalAccessException {
        View view = database.getView(VIEW_IDS);
        Document document = view.getFirstDocumentByKey(id, true);
        if (document != null) {
            document.remove(true);
        }
    }
}
