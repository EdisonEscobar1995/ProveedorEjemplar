package com.nutresa.exemplary_provider.dtl.queries;

public enum FieldsQuestion {
    CRITERION, DIMENSION;
       
    public static FieldsQuestion getType(String fieldName) {
        return FieldsQuestion.valueOf(fieldName.toUpperCase());
    }
}
