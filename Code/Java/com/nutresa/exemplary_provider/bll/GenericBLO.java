package com.nutresa.exemplary_provider.bll;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.utils.Common;

public class GenericBLO<T, D> {

    private Class<D> daoClass;

    public GenericBLO(Class<D> daoClass) {
        this.daoClass = daoClass;
    }

    @SuppressWarnings("unchecked")
    public T get(Map<String, String> parameters) throws IllegalAccessException,
    InstantiationException, NoSuchMethodException,
    InvocationTargetException {
        D dao = this.daoClass.newInstance();
        Method method = dao.getClass().getMethod("get", String.class);
        T dto = (T) method.invoke(dao, parameters.get("id"));

        return dto;
    }

    @SuppressWarnings("unchecked")
    public List<T> getAll() throws IllegalAccessException,
    InstantiationException, NoSuchMethodException,
    InvocationTargetException {
        List<T> list = new ArrayList<T>();
        D dao = this.daoClass.newInstance();
        Method method = dao.getClass().getMethod("getAll");
        list = (List<T>) method.invoke(dao);
        return list;
    }

    @SuppressWarnings("unchecked")
    public T save(T dto) throws IllegalAccessException, InstantiationException,
    NoSuchMethodException, InvocationTargetException {
        Field field = Common.getField(dto.getClass(), "id");
        String id = (String) field.get(dto);
        field = Common.getField(dto.getClass(), "form");
        Method method;
        D dao = this.daoClass.newInstance();
        if ("".equals(id)) {
            method = Common.getMethod(this.daoClass, "save");
            dto = (T) method.invoke(dao, dto);
        } else {
            method = Common.getMethod(this.daoClass, "update");
            dto = (T) method.invoke(dao, id, dto);
        }

        return dto;
    }

    public List<T> saveList(List<T> dtoList) throws IllegalAccessException,
    InstantiationException, NoSuchMethodException,
    InvocationTargetException {
        int iterator = 0;
        for (T dto : dtoList) {
            dtoList.set(iterator, save(dto));
            iterator++;
        }
        return dtoList;
    }

    public void delete(Map<String, String> parameters)
    throws IllegalAccessException, InstantiationException,
    NoSuchMethodException, InvocationTargetException {
        D dao = daoClass.newInstance();
        Method method = dao.getClass().getMethod("delete", String.class);
        method.invoke(dao, parameters.get("id"));
    }

}
