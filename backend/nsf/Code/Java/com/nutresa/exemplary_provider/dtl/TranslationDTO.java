package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class TranslationDTO {
    @Expose
    private String id;
    @Expose
    private String language;
    @Expose
    private String entity;
    @Expose
    private String entityId;
    @Expose
    private String name;
    @Expose
    private String value;

    public String getLanguage() {
        return this.language;
    }

    public void setLanguage(String languaje) {
        this.language = languaje;
    }

    public String getEntity() {
        return this.entity;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }

    public String getEntityId() {
        return this.entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getName() {
        return this.name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getValue() {
        return this.value;
    }
    public void setValue(String value) {
        this.value = value;
    }
    public String getId() {
        return this.id;
    }

}
