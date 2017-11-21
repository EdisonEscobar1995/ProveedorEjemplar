package com.nutresa.exemplary_provider.dal;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Vector;
import java.util.Map.Entry;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.Session;
import org.openntf.domino.View;
import org.openntf.domino.ViewColumn;
import org.openntf.domino.ViewEntry;
import org.openntf.domino.ViewEntryCollection;
import org.openntf.domino.utils.Factory;

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
    
    public List<T> getAllBy(Map<String, String> parameters) throws HandlerGenericException {
        View view = getIndexedView(parameters);
        List<T> list;
        if(null == view){
            view = database.getView(entityView);
            list = searchDocuments(view, parameters);
        } else {
            Vector<String> indexedParameters = getIndexedParameters(view, parameters);
            list = getAllDocumentsByKey(view, indexedParameters);
            
        }
        return list;
    }

    @SuppressWarnings("deprecation")
    protected List<T> getAllDocumentsByKey(View view, Vector<String> indexedParameters) throws HandlerGenericException {
        List<T> list = new ArrayList<T>();
        DocumentCollection documents = view.getAllDocumentsByKey(indexedParameters, true);
        
        for (Document document : documents) {
            list.add((T) this.castDocument(document));
        }
        return list;
    }

    protected List<T> searchDocuments(View view, Map<String, String> parameters) {
        Document document;
        String query = getQuerySearch(parameters);
        List<T> list = new ArrayList<T>();
        try {
            int cantidadDocumentos = view.FTSearch(query);
            if (0 < cantidadDocumentos) {
                ViewEntryCollection vec = view.getAllEntries();
                for (ViewEntry viewEntry : vec) {
                    document = viewEntry.getDocument();
                    list.add((T) this.castDocument(document));
                }
            }
        } catch (HandlerGenericException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return list;
    }

    @SuppressWarnings("unchecked")
    protected T castDocument(Document document) throws HandlerGenericException {
        T result = null;
        try {
            if (document != null) {
                result = this.dtoClass.newInstance();
                List<Field> fields = new ArrayList();
                for (Field field : Common.getAllFields(fields, this.dtoClass)) {
                    field.setAccessible(true);
                    Object value = getValue(document, field.getName(), field.getType());
                    field.set(result, value);
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return result;
    }

    protected Object castProperty() {

        return null;
    }

    @SuppressWarnings("unchecked")
    public static <T> T getValue(Document document, String name, Class<?> type) {
        Object value = null;
        if (type.isPrimitive()) {
            Double numberValue = document.getItemValue(name, Double.class);
            if (null == numberValue) {
                numberValue = new Double(0);
            }
            value = getPrimitiveValue(type, numberValue);
        }
        if (null == value) {
            value = document.getItemValue(name, type);
        }
        return (T) value;
    }

    protected static Object getPrimitiveValue(Class<?> type, Double numberValue) {
        Object value;
        switch (com.nutresa.exemplary_provider.utils.Types.getType(type)) {
        case BYTE:
            value = numberValue.byteValue();
            break;
        case BOOLEAN:
            value = numberValue.intValue() != 0;
            break;
        case CHAR:
            value = '\u0000';
            break;
        case SHORT:
            value = numberValue.shortValue();
            break;
        case INT:
            value = numberValue.intValue();
            break;
        case FLOAT:
            value = numberValue.floatValue();
            break;
        case LONG:
            value = numberValue.longValue();
            break;
        case DOUBLE:
            value = numberValue;
            break;
        default:
            value = null;
            break;
        }
        return value;
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
        HandlerGenericException error = null;
        try {
            String id = document.getItemValueString("id");
            if (newDocument) {
                id = document.getUniversalID();
            }

            List<Field> fields = new ArrayList();         
            for (Field field : Common.getAllFields(fields, this.dtoClass)) {
                field.setAccessible(true);
                document.replaceItemValue(field.getName(), field.get(dto));
            }

            document.replaceItemValue("form", this.entityForm);
            document.replaceItemValue("id", id);

            if (document.save(true, false)) {
                Field field = Common.getField(dto.getClass(), "id");
                field.set(dto, id);
            } else {
                error = new HandlerGenericException("Cant create document");
            }

        } catch (Exception exception) {
            error = new HandlerGenericException(exception);
        }

        if (null != error) {
            throw error;
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
    
    public Database getDatabase() {
        return database;
    }

    protected String getNameUserInSession() {
        return session.getEffectiveUserName();
    }

    public String getEntity() {
        return entity;
    }
    
    protected View getIndexedView(Map<String, String> parameters) {
        List<View> views = database.getViews(entity);
        View indexedView = null;
        for (View view : views) {
            Vector<ViewColumn> columns = view.getColumns();
            Set<String> keys = new HashMap<String, String>(parameters).keySet();
            if (columns.size() == parameters.size()) {
                for (ViewColumn column : columns) {
                    String columnName = column.getTitle();
                    if (keys.contains(columnName)) {
                        keys.remove(columnName);
                    }
                }
                if (keys.size() == 0) {
                    indexedView = view;
                    break;
                }
            }
        }
        return indexedView;
    }
    
    protected Vector<String> getIndexedParameters(View view, Map<String, String> parameters) {
        Vector<String> indexedParameters = new Vector<String>();
        Vector<ViewColumn> columns = view.getColumns();
        for (ViewColumn column : columns) {
            String columnName = column.getTitle();
            indexedParameters.add(parameters.get(columnName));
        }
        return indexedParameters;
    }

    protected String getQuerySearch(Map<String, String> parameters) {
        String[] query = new String[parameters.size()];
        int i = 0;
        for (Entry<String, String> parameter : parameters.entrySet()) {
            query[i] = "[" + parameter.getKey() + "]=" + parameter.getValue();
            i++;
        }
        return Common.join(query, " AND ");
    }
}
