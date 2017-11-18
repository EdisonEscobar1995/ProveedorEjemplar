package com.nutresa.exemplary_provider.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

public class Common {

    private Common() {
        throw new IllegalStateException("Utility class");
    }

    public static Method getMethod(Class<?> clazz, String name) throws HandlerGenericException {
        Method method = null;
        try {
            for (Method methodAux : clazz.getMethods()) {
                if (methodAux.getName().equals(name)) {
                    method = methodAux;
                    method.setAccessible(true);
                    break;
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return method;
    }

    @SuppressWarnings("unchecked")
    public static Field getField(Class<?> declarationDTO, String name) throws HandlerGenericException {
        Field field = null;
        try {
            if (declarationDTO.getSuperclass() != Object.class) {
                Class superClass = declarationDTO.getSuperclass();
                field = superClass.getDeclaredField(name);
            } else {
                field = declarationDTO.getDeclaredField(name);
            }
            field.setAccessible(true);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return field;
    }

    public static List<Field> getAllFields(List<Field> fields, Class<?> type) {
        fields.addAll(Arrays.asList(type.getDeclaredFields()));

        if (type.getSuperclass() != Object.class) {
            getAllFields(fields, type.getSuperclass());
        }

        return fields;
    }

}
