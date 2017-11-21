package com.nutresa.exemplary_provider.api;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.Common;

public class GenericAPI<T, B> extends BaseAPI<T> {
    private Class<B> bloClass;

    public GenericAPI(Class<T> dtoClass, Class<B> bloClass) {
        super(dtoClass);
        this.bloClass = bloClass;
    }

    @SuppressWarnings("unchecked")
    public ServletResponseDTO<T> get(Map<String, String> parameters) {
        B blo;
        ServletResponseDTO<T> response = null;
        try {
            blo = this.bloClass.newInstance();
            Method method = blo.getClass().getMethod("get", Map.class);
            response = new ServletResponseDTO<T>((T) method.invoke(blo, parameters));
        } catch (Exception exception) {
            response = new ServletResponseDTO<T>(exception);
        }

        return response;
    }

    @SuppressWarnings("unchecked")
    public ServletResponseDTO<List<T>> getAll(Map<String, String> parameters) {
        B blo;
        ServletResponseDTO<List<T>> response = null;
        Method method;
        try {
            if (parameters.size() > 0) {
                blo = this.bloClass.newInstance();
                method = blo.getClass().getMethod("getAllBy", Map.class);
                response = new ServletResponseDTO<List<T>>((List<T>) method.invoke(blo, parameters));
            } else {
                blo = this.bloClass.newInstance();
                method = blo.getClass().getMethod("getAll");
                response = new ServletResponseDTO<List<T>>((List<T>) method.invoke(blo));
            }
        } catch (Exception exception) {
            response = new ServletResponseDTO<List<T>>(exception);
        }
        return response;
    }

    @SuppressWarnings("unchecked")
    public ServletResponseDTO<T> save(T dto) {
        B blo;
        ServletResponseDTO<T> response = null;
        try {
            blo = this.bloClass.newInstance();
            Method method = Common.getMethod(this.bloClass, "save");
            response = new ServletResponseDTO<T>((T) method.invoke(blo, dto));
        } catch (Exception exception) {
            response = new ServletResponseDTO<T>(exception);
        }

        return response;
    }

    @SuppressWarnings("unchecked")
    public ServletResponseDTO<T> delete(Map<String, String> parameters) {
        B blo;
        ServletResponseDTO<T> response = null;
        try {
            blo = this.bloClass.newInstance();
            Method method = blo.getClass().getMethod("delete", Map.class);
            response = new ServletResponseDTO<T>((T) method.invoke(blo, parameters));
        } catch (Exception exception) {
            response = new ServletResponseDTO<T>(exception);
        }

        return response;
    }
}