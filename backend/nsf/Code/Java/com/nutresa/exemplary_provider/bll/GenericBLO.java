package com.nutresa.exemplary_provider.bll;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.GenericDAO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class GenericBLO<T, D> {

    private Class<D> daoClass;

    public GenericBLO(Class<D> daoClass) {
        this.daoClass = daoClass;
    }

    @SuppressWarnings("unchecked")
    public T get(String id) throws HandlerGenericException {
        D dao;
        T response;
        try {
            dao = this.daoClass.newInstance();
            Method method = dao.getClass().getMethod("get", String.class);
            response = (T) method.invoke(dao, id);
        } catch (Exception e) {
            throw new HandlerGenericException(e);
        }

        return response;
    }

    @SuppressWarnings("unchecked")
    public T getBy(Map<String, String> parameters) throws HandlerGenericException {
        D dao;
        T response;
        try {
            dao = this.daoClass.newInstance();
            Method method = dao.getClass().getMethod("getBy", Map.class);
            response = (T) method.invoke(dao, parameters);
        } catch (Exception e) {
            throw new HandlerGenericException(e);
        }

        return response;
    }

    @SuppressWarnings("unchecked")
    public List<DTO> getAll() throws HandlerGenericException {
        D dao;
        List<DTO> response;
        try {
            dao = this.daoClass.newInstance();
            Method method = dao.getClass().getMethod("getAll");
            response = (List<DTO>) method.invoke(dao);
        } catch (Exception e) {
            throw new HandlerGenericException(e);
        }

        return response;
    }

    @SuppressWarnings("unchecked")
    public List<DTO> getAllBy(Map<String, String> parameters) throws HandlerGenericException {
        D dao;
        List<DTO> response;
        try {
            dao = this.daoClass.newInstance();
            Method method = dao.getClass().getMethod("getAllBy", Map.class);
            response = (List<DTO>) method.invoke(dao, parameters);
        } catch (Exception e) {
            throw new HandlerGenericException(e);
        }

        return response;
    }

    public List<DTO> getAllBy(String field, String value) throws HandlerGenericException {
        Map<String, String> filter = new HashMap<String, String>();
        filter.put(field, value);
        return getAllBy(filter);
    }
    
    @SuppressWarnings("unchecked")
    public T save(T dto) throws HandlerGenericException {
        try {
            Field field = Common.getField(dto.getClass(), "id");
            String id;
            id = (String) field.get(dto);
            Method method = null;
            D dao = this.daoClass.newInstance();
            if ("".equals(id) || null == id) {
                method = Common.getMethod(this.daoClass, "save", 1);
                dto = (T) method.invoke(dao, dto);
            } else {
                method = Common.getMethod(this.daoClass, "update", 2);
                dto = (T) method.invoke(dao, id, dto);
            }
        } catch (Exception e) {
            throw new HandlerGenericException(e);
        }

        return dto;
    }

    public List<T> saveList(List<T> dtoList, String fieldName, String value) throws HandlerGenericException {
        int iterator = 0;
        try {
            for (T dto : dtoList) {
                Field field = Common.getField(dto.getClass(), fieldName);
                field.set(dto, value);
                dtoList.set(iterator, save(dto));
                iterator++;
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return dtoList;
    }

    public boolean delete(Map<String, String> parameters) throws HandlerGenericException {
        boolean response = false;
        D dao;
        try {
            dao = daoClass.newInstance();
            Method method = dao.getClass().getMethod("delete", String.class);
            response = (Boolean) method.invoke(dao, parameters.get("id"));
        } catch (Exception e) {
            throw new HandlerGenericException(e);
        }

        return response;
    }

    public List<DTO> getAllByIds(List<Object> list) throws HandlerGenericException {
        return getAllByIds("id", list, false);
    }
    
    public List<DTO> getAllByIds(List<Object> list, boolean uniqueIds) throws HandlerGenericException {
        return getAllByIds("id", list, uniqueIds);
    }

    public List<DTO> getAllByIds(String field, List<Object> list) throws HandlerGenericException {
        return getAllByIds(field, list, false);
    }
    
    @SuppressWarnings("unchecked")
    public List<DTO> getAllByIds(String field, List<Object> list, boolean uniqueIds) throws HandlerGenericException {
        D dao;
        List<DTO> response;
        try {
            dao = daoClass.newInstance();
            response = ((GenericDAO) dao).getAllByIds(field, list, uniqueIds);
        } catch (Exception e) {
            throw new HandlerGenericException(e);
        }

        return response;
    }
    
    @SuppressWarnings("unchecked")
    public Map<String, List<DTO>> getMasters(String[] idFieldNames, Map<String, List<Object>> joinIds) throws HandlerGenericException {
        Map<String, List<DTO>> masters = new HashMap<String, List<DTO>>();

        try {
            for (String idFieldName : idFieldNames) {
                GenericBLO blo = FactoryBLO.getBlo(idFieldName);
                masters.put(idFieldName, blo.getAllByIds(joinIds.get(idFieldName)));
            }
        } catch (HandlerGenericException e) {
            throw new HandlerGenericException(e);
        }
        return masters;
    }
    
    @SuppressWarnings("unchecked")
    public List<Object> getFieldAll(int column) throws HandlerGenericException {
        List<Object> response = new ArrayList<Object>();
        D dao;
        try {
            dao = daoClass.newInstance();
            response = ((GenericDAO) dao).getFieldAll(column);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return response;
    }

    @SuppressWarnings("unchecked")
    public List<Object> getFieldAll(int column, String defaultView) throws HandlerGenericException {
        List<Object> response = new ArrayList<Object>();
        D dao;
        try {
            dao = daoClass.newInstance();
            response = ((GenericDAO) dao).getFieldAll(column, defaultView);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return response;
    }
    
    @SuppressWarnings("unchecked")
    public List<DTO> getAllBy(Map<String, String> parameters, String defaultView) throws HandlerGenericException {
        D dao;
        List<DTO> response;
        try {
            dao = daoClass.newInstance();
            response = ((GenericDAO) dao).getAllBy(parameters, defaultView);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return response;
    }

    public List<DTO> getAllBy(String field, String value, String defaultView) throws HandlerGenericException {
        Map<String, String> filter = new HashMap<String, String>();
        filter.put(field, value);
        return getAllBy(filter, defaultView);
    }
}
