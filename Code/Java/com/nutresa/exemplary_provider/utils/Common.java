package com.nutresa.exemplary_provider.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

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

    public static List<Field> getAllFields(List<Field> fields, Class<?> type) {
        fields.addAll(Arrays.asList(type.getDeclaredFields()));

        if (type.getSuperclass() != null) {
            getAllFields(fields, type.getSuperclass());
        }
        return fields;
    }    
    
}
