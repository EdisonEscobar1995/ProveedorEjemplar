package com.nutresa.exemplary_provider.dal;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.Session;
import org.openntf.domino.View;
import org.openntf.domino.utils.Factory;
import org.openntf.domino.ViewEntryCollection;
import org.openntf.domino.ViewEntry;

import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public abstract class GenericDAO<T> {

    private Session session;
    private Database database;
    private Class<T> dtoClass;
    private static final String VIEW_IDS = "vwDevIds";
    private String entityForm;
    protected String entityView;
    protected String entity;

    private static final String PREFIX_FORM = "fr";
    private static final String PREFIX_VIEW = "vw";

    public GenericDAO(Class<T> dtoClass) {
        this.session = Factory.getSession();
        this.database = session.getCurrentDatabase();
        this.dtoClass = dtoClass;

        entity = this.getClass().getSimpleName();
        entity = entity.substring(0, entity.length() - 3);

        this.entityForm = PREFIX_FORM + entity;
        this.entityView = PREFIX_VIEW + entity + "s";
    }

    public T get(String id) throws HandlerGenericException {
        View currentView = database.getView(VIEW_IDS);
        Document document = currentView.getFirstDocumentByKey(id, true);
        return castDocument(document);
    }

    public List<T> getAll() throws HandlerGenericException {
        View view = database.getView(this.entityView);
        ViewEntryCollection vec = view.getAllEntries();
        Document document;
        List<T> list = new ArrayList<T>();
        for (ViewEntry viewEntry : vec) {
            document = viewEntry.getDocument();
            list.add((T) this.castDocument(document));
        }
        return list;
    }

    @SuppressWarnings("unchecked")
    private T castDocument(Document document) throws HandlerGenericException {
        T result = null;
        try {
            if (document != null) {
                result = this.dtoClass.newInstance();
                List<Field> fields = new ArrayList();
                for (Field field : Common.getAllFields(fields, this.dtoClass)) {
                    field.setAccessible(true);
                    field.set(result, document.getItemValue(field.getName(), field.getType()));
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return result;
    }

    public T save(T dto) throws HandlerGenericException {
        Document document = database.createDocument();
        return this.saveDocument(document, dto, true);
    }

    public T saveProfile(T dto) throws HandlerGenericException {
        View vw = database.getView(this.entityView);
        Document document = vw.getFirstDocumentByKey(this.entityForm, true);
        if (document == null) {
            dto = this.save(dto);
        } else {
            dto = this.saveDocument(document, dto, false);
        }

        return dto;
    }

    @SuppressWarnings("unchecked")
    private T saveDocument(Document document, T dto, boolean newDocument) throws HandlerGenericException {
        try {
            String id = document.getItemValueString("id");
            if (newDocument) {
                id = document.getUniversalID();
            }

            List<Field> fields = new ArrayList();
            for (Field field : Common.getAllFields(fields, this.dtoClass)) {
                field.setAccessible(true);
                if (!"id".equals(field.getName())) {
                    document.replaceItemValue(field.getName(), field.get(dto));
                }
            }

            document.replaceItemValue("form", this.entityForm);
            document.replaceItemValue("id", id);

            if (document.save(true, false)) {
                Field field = Common.getField(dto.getClass(), "id");
                field.set(dto, id);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return dto;
    }

    public T update(String id, T dto) throws HandlerGenericException {
        try {
            View vw = database.getView(VIEW_IDS);
            Document document = vw.getFirstDocumentByKey(id, true);
            if (document != null) {
                dto = this.saveDocument(document, dto, false);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return dto;
    }

    public boolean delete(String id) throws HandlerGenericException {
        boolean response = false;
        try {
            View view = database.getView(VIEW_IDS);
            Document document = view.getFirstDocumentByKey(id, true);
            if (document != null) {
                response = document.remove(true);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    public String getEntity() {
        return entity;
    }

}
