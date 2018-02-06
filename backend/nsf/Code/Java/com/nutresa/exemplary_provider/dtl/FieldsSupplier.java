package com.nutresa.exemplary_provider.dtl;

public enum FieldsSupplier {
    CATEGORY("idCategory"), COMPANYSIZE("idCompanySize"), COUNTRY("idCountry"), SUPPLIER("id"), SUPPLY("idSupply");

    private final String fieldName;

    FieldsSupplier(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getFieldName() {
        return this.fieldName;
    }

    public static FieldsSupplier getType(String fieldName) {
        return FieldsSupplier.valueOf(fieldName.toUpperCase());
    }
}
