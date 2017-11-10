package com.nutresa.exemplary_provider.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class Common {

    private Common() {
        throw new IllegalStateException("Utility class");
    }

    public static Method getMethod(Class<?> clazz, String name) {
        Method method = null;
        for (Method methodAux : clazz.getMethods()) {
            if (methodAux.getName().equals(name)) {
                method = methodAux;
                method.setAccessible(true);
                break;
            }
        }
        return method;
    }

    public static Field getField(Class<?> clazz, String name) {
        Field field = null;
        for (Field fieldAux : clazz.getDeclaredFields()) {
            if (fieldAux.getName().equals(name)) {
                field = fieldAux;
                field.setAccessible(true);
                break;
            }
        }
        return field;
    }

    public static Object setField(Object origin, String name, Object value)
    throws HandlerGenericException {
        Field field = getField(origin.getClass(), name);
        if (null != field) {
            try {
                field.set(origin, value);
            } catch (Exception exception) {
                throw new HandlerGenericException(exception);
            }
        }
        return origin;
    }

}
