package com.nutresa.exemplary_provider.dal;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
    private String entityForm;
    protected String entityView;
    protected String entity;

    private static final String PREFIX_FORM = "fr";
    private static final String PREFIX_VIEW = "vw";
    
    protected String indexName;
    protected Map<String, View> indexView = new HashMap<String, View>();
    protected HashMap<String, String[]> indexParameters = new HashMap<String, String[]>();
    protected String defaulView;

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
        View currentView = database.getView(entityView);
        Document document = currentView.getFirstDocumentByKey(id, true);
        return castDocument(document);
    }

    public T getBy(Map<String, String> parameters) throws HandlerGenericException {
        return getBy(parameters, null);
    }

    public T getBy(Map<String, String> parameters, String defaultView) throws HandlerGenericException {
        View view = getIndexedView(parameters, defaultView);
        Document document = null;
        if (null == view) {
            view = database.getView(entityView);
            String query = getQuerySearch(parameters);
            if (view.FTSearch(query, 1) > 0) {
                document = view.getFirstDocument();
            }
        } else {
            ArrayList<String> indexedParameters = getIndexedParameters(view, parameters);
            document = view.getFirstDocumentByKey(indexedParameters, true);
        }
        return null != document ? castDocument(document) : null;
    }
    
    public T getBy(String field, String value) throws HandlerGenericException {
        Map<String, String> filter = new HashMap<String, String>();
        filter.put(field, value);
        return getBy(filter);
    }
    
    public List<T> getAll() throws HandlerGenericException {
        View view = database.getView(entityView);
        List<T> list = new ArrayList<T>();
        if (null != view) {
            ViewEntryCollection vec = view.getAllEntries();
            Document document;
            for (ViewEntry viewEntry : vec) {
                document = viewEntry.getDocument();
                list.add((T) this.castDocument(document));
            }
        } else {
            throw new HandlerGenericException("View " + entityView + " not found");
        }
        return list;
    }

    // public List<T> getAllKeys(Collection ids){
    // return getAllByIds("id", ids);
    // }

    // public List<T> getAllByIds(String name, Collection ids){
    // String allIds = ;
    // HashMap<String, String> filter = new HashMap<String, String>();
    // filter.put(name, allIds);
    // return getAllBy();
    // }
    
    public List<T> getAllBy(Map<String, String> parameters) throws HandlerGenericException {
        return getAllBy(parameters, null);
    }
    
    public List<T> getAllBy(Map<String, String> parameters, String defaultView) throws HandlerGenericException {
        View view = getIndexedView(parameters, defaultView);
        List<T> list;
        if(null == view){
            view = database.getView(entityView);
            list = searchDocuments(view, parameters);
        } else {
            ArrayList<String> indexedParameters = getIndexedParameters(view, parameters);
            list = getAllDocumentsByKey(view, indexedParameters);
        }
        return list;
    }
    
    public List<T> getAllBy(String field, String value) throws HandlerGenericException {
        return getAllBy(field, value, null);
    }

    public List<T> getAllBy(String field, String value, String defaultView) throws HandlerGenericException {
        Map<String, String> filter = new HashMap<String, String>();
        filter.put(field, value);
        return getAllBy(filter, defaultView);
    }
    
    protected List<T> getAllDocumentsByKey(View view, ArrayList<String> indexedParameters) throws HandlerGenericException {
        List<T> list = new ArrayList<T>();
        DocumentCollection documents = view.getAllDocumentsByKey(indexedParameters, true);
        
        for (Document document : documents) {
            list.add((T) this.castDocument(document));
        }
        return list;
    }

    protected List<T> searchDocuments(View view, Map<String, String> parameters) throws HandlerGenericException {
        Document document;
        String query = getQuerySearch(parameters);
        List<T> list = new ArrayList<T>();
        if (view.FTSearch(query) > 0) {
            ViewEntryCollection vec = view.getAllEntries();
            for (ViewEntry viewEntry : vec) {
                document = viewEntry.getDocument();
                list.add((T) this.castDocument(document));
            }
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
    public static <T> T getValue(Document document, String name, Class<?> type) throws IllegalAccessException, InstantiationException {
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
            if (null == value && "List".equals(type.getSimpleName())) {
                value = new ArrayList<T>();
            }
        }
        return (T) value;
    }
    
    public static boolean isList() {

        return true;
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
            View vw = database.getView(entityView);
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
            View view = database.getView(entityView);
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
    
    protected View getIndexedView(Map<String, String> parameters, String defaultView) {
        View indexedView = null;
        indexName = getIndexName(parameters);

        if (!indexView.containsKey(indexName)) {
            List<View> views = database.getViews(null == defaultView ? entity : defaultView);
            for (View view : views) {
                ArrayList<ViewColumn> columns = new ArrayList<ViewColumn>(view.getColumns());
                Set<String> parameterKeys = new HashMap<String, String>(parameters).keySet();
                if (validateColumnsInView(columns, parameterKeys)) {
                    indexedView = view;
                    if(null != defaultView){
                        indexView.put(indexName, view);
                    }
                    break;
                }
            }
        } else {
            indexedView = indexView.get(indexName);
        }
        return indexedView;
    }
    
    protected String getIndexName(Map<String, String> parameters) {
        return parameters.keySet().toString();
    }
    
    protected boolean validateColumnsInView(ArrayList<ViewColumn> columns, Set<String> keys) {
        String[] indexColumns = new String[keys.size()];
        String columnName;
        int i = 0;
        for (ViewColumn column : columns) {
            columnName = column.getTitle();
            if (keys.contains(columnName)) {
                indexColumns[i++] = columnName;
            }
        }
        if (i == keys.size()) {
            indexParameters.put(indexName, indexColumns);
        }
        return indexParameters.containsKey(indexName);
    }
    
    protected ArrayList<String> getIndexedParameters(View view, Map<String, String> parameters) {
        ArrayList<String> indexedParameters = new ArrayList<String>();
        if (!indexParameters.containsKey(indexName)) {
            ArrayList<ViewColumn> columns = new ArrayList<ViewColumn>(view.getColumns());
            for (ViewColumn column : columns) {
                String columnName = column.getTitle();
                indexedParameters.add(parameters.get(columnName));
                if (indexedParameters.size() >= parameters.size()) {
                    break;
                }
            }
        } else {
            for (String column : indexParameters.get(indexName)) {
                indexedParameters.add(parameters.get(column));
                if (indexedParameters.size() >= parameters.size()) {
                    break;
                }
            }
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
