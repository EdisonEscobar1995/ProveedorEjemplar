package com.nutresa.exemplary_provider.utils;

import java.util.Arrays;

public enum Types {
    BYTE, BOOLEAN, SHORT, CHAR, INT, FLOAT, LONG, DOUBLE, OBJECT;

    private static final String ALL_TYPES_STRING = Arrays.toString(Types.values());

    public static Types getType(Class<?> clazz) {
        
        String className = clazz.getSimpleName().toUpperCase();
        if (clazz.isPrimitive() && ALL_TYPES_STRING.contains(className)) {
            return Types.valueOf(className);
        } else {
            return Types.OBJECT;
        }
    }
}