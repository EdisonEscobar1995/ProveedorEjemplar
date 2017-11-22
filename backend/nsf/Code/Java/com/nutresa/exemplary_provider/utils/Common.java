package com.nutresa.exemplary_provider.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

public class Common {

    private static final int JOIN_ELEMENT_SIZE = 50;

    private Common() {
        throw new IllegalStateException("Utility class");
    }

    @Deprecated
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

    public static Method getMethod(Class<?> clazz, String name, int parameterQuantity) throws HandlerGenericException {
        Method method = null;
        try {
            for (Method methodAux : clazz.getMethods()) {
                if (methodAux.getName().equals(name) && methodAux.getParameterTypes().length == parameterQuantity) {
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

    public static String getExceptionMessage(Exception exception) {
        String message = exception.getMessage();
        if (null == message || message.length() == 0) {
            message = exception.getCause().getMessage();
            if (null == message || message.length() == 0) {
                message = exception.getClass().getSimpleName();
            }
        }
        return message;
    }
    
    @SuppressWarnings("squid:S1166")
    public static boolean isClass(String className) {
        try {
            Class.forName(className);
            return true;
        } catch (ClassNotFoundException exception) {
            return false;
        }
    }
    
    public static String join(String[] arr, String separator) {
        if (null == arr || 0 == arr.length) {
            return "";
        }
        StringBuilder stringBuilder = new StringBuilder(JOIN_ELEMENT_SIZE * arr.length);
        stringBuilder.append(arr[0]);
        if (arr.length > 1) {
            for (int i = 1; i < arr.length; i++) {
                stringBuilder.append(separator).append(arr[i]);
            }
        }
        return stringBuilder.toString();
    }

}
