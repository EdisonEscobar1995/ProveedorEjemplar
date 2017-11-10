package com.nutresa.exemplary_provider.bll;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import org.openntf.domino.utils.DominoUtils;

import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class GenericBLO<T, D> {

    private Class<D> daoClass;

    public GenericBLO(Class<D> daoClass) {
        this.daoClass = daoClass;
    }

    @SuppressWarnings("unchecked")
    public T get(Map<String, String> parameters) throws HandlerGenericException {
        D dao;
        T response;
        try {
            dao = this.daoClass.newInstance();
            Method method = dao.getClass().getMethod("get", String.class);
            response = (T) method.invoke(dao, parameters.get("id"));
        } catch (Exception e) {
            throw new HandlerGenericException(e);
        }
        
        return response;
    }

    @SuppressWarnings("unchecked")
    public List<T> getAll() throws HandlerGenericException {
        D dao;
        List<T> response;
        try {
            dao = this.daoClass.newInstance();
            Method method = dao.getClass().getMethod("getAll");
            response = (List<T>) method.invoke(dao);
        } catch (Exception e) {
            throw new HandlerGenericException(e);
        }
        
        return response;
    }

    @SuppressWarnings("unchecked")
    public T save(T dto) throws HandlerGenericException {
        try {
            Field field = Common.getField(dto.getClass(), "id");
            String id;
            id = (String) field.get(dto);
            Method method = null;
            D dao = this.daoClass.newInstance();
            if ("".equals(id)) {
                method = Common.getMethod(this.daoClass, "save");
                dto = (T) method.invoke(dao, dto);
            } else {
                method = Common.getMethod(this.daoClass, "update");
                dto = (T) method.invoke(dao, id, dto);
            }
        } catch (Exception e) {
            throw new HandlerGenericException(e);
        }

        return dto;
    }

    public List<T> saveList(List<T> dtoList) throws HandlerGenericException {
        int iterator = 0;
        try {
            for (T dto : dtoList) {
                dtoList.set(iterator, save(dto));
                iterator++;
            }
        } catch (HandlerGenericException exception) {
            DominoUtils.handleException(new Throwable(exception));
            throw exception;
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

}
