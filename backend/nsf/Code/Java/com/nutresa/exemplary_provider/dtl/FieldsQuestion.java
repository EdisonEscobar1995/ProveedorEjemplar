package com.nutresa.exemplary_provider.dtl;

public enum FieldsQuestion {
    CALL("idCall"), CRITERION("idCriterion"), DIMENSION("idDimension");

    private final String fieldName;

    FieldsQuestion(String fieldName) {
        this.fieldName = fieldName;
    }

    public static FieldsQuestion getType(String fieldName) {
        return FieldsQuestion.valueOf(fieldName.toUpperCase());
    }

    public String getFieldName() {
        return this.fieldName;
    }
}
