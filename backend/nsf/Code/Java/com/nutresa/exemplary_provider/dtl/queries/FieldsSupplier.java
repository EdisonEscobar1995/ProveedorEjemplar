package com.nutresa.exemplary_provider.dtl.queries;

public enum FieldsSupplier {
    CATEGORY, COMPANYSIZE, COUNTRY, SUPPLIER, SUPPLY;

    public static FieldsSupplier getType(String fieldName) {
        return FieldsSupplier.valueOf(fieldName.toUpperCase());
    }
}
