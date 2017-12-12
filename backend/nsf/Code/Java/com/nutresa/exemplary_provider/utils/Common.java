package com.nutresa.exemplary_provider.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;

import org.openntf.domino.utils.DominoUtils;

public class Common {

    private static final int JOIN_ELEMENT_SIZE = 50;
    public static final char SEPARATOR_LIST = 0x05;

    private Common() {
        throw new IllegalStateException("Utility class");
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

    public static <T> Object getFieldValue(T dto, String name) throws HandlerGenericException {
        Object response = null;
        try {
            Field field = Common.getField(dto.getClass(), name);
            if (null != field) {
                field.setAccessible(true);
                response = field.get(dto);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return response;
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

    public static boolean isClass(String className) {
        try {
            Class.forName(className);
            return true;
        } catch (Exception exception) {
            DominoUtils.handleException(new Throwable(exception));
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

    public static String buildPathResource() {
        return getHostName() + "/" + getExternalContext().getRequestContextPath();
    }

    private static ExternalContext getExternalContext() {
        FacesContext facesContext = FacesContext.getCurrentInstance();
        return facesContext.getExternalContext();
    }

    public static String getHostName() {
        ExternalContext externalContext = getExternalContext();
        HttpServletRequest request = (HttpServletRequest) externalContext.getRequest();
        // TODO quitar el puerto
        return "http" + (request.isSecure() ? "s" : "") + "://" + request.getServerName() + ":90";
    }

    public static String getIdsFromList(List<Object> list) {
        return getIdsFromList(list, false);
    }

    public static String getIdsFromList(List<Object> list, boolean uniqueIds) {
        int size = null != list ? list.size() : 0;
        if (isValidListIds(list, size)) {
            return "";
        }
        StringBuilder ids = new StringBuilder();
        String value;
        for (int i = 0; i < size; i++) {
            value = ((String) list.get(i)).trim();
            if (isValidId(value, ids, uniqueIds)) {
                ids.append(value).append(SEPARATOR_LIST);
            }
        }
        if (ids.length() > 0) {
            ids.setLength(ids.length() - 1);
            return ids.toString();
        } else {
            return "";
        }
    }

    private static boolean isValidId(String value, StringBuilder ids, boolean uniqueIds) {
        return null != value && !value.isEmpty() && (!uniqueIds || (uniqueIds && ids.indexOf(value) == -1));
    }

    private static boolean isValidListIds(List<Object> list, int size) {
        return (null == list || 0 == size || (!list.get(0).getClass().isPrimitive() && !(list.get(0) instanceof String)));
    }

    public static String getNamespace(Class<?> clazz) {
        String name = clazz.getName();
        String className = clazz.getSimpleName();
        return name.substring(0, name.length() - className.length());
    }

    @SuppressWarnings("unchecked")
    public static <T> Map<String, List<Object>> getDtoFields(List<T> data, String[] idFieldsNames, Class clazz)
            throws HandlerGenericException {
        Map<String, List<Object>> listIds = new HashMap<String, List<Object>>();
        Map<String, Field> listFields = new HashMap<String, Field>();

        try {
            for (String entity : idFieldsNames) {
                String field;
                if (entity.startsWith("[") && entity.endsWith("]")) {
                    field = entity.substring(1, entity.length() - 1);
                } else {
                    field = "id" + entity;
                }
                Field declaredField = Common.getField(clazz, field);
                declaredField.setAccessible(true);
                listFields.put(entity, declaredField);
                listIds.put(entity, new ArrayList<Object>());
            }
            for (Object row : data) {
                for (String field : idFieldsNames) {
                    listIds.get(field).add(listFields.get(field).get(row));
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return listIds;
    }

    public static List<String> arrayToList(String[] items) {
        List<String> list = new ArrayList<String>();

        for (String item : items) {
            list.add(item);
        }
        return list;
    }

}
