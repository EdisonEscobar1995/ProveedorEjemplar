package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class DictionaryDTO {
    @Expose
    private String id;
    @Expose
    private String component;
    @Expose
    private String name;
    @Expose
    private String label;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
