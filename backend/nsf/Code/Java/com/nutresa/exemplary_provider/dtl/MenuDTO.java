package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class MenuDTO extends MasterDTO {
    @Expose
    private String title;
    @Expose
    private String type;
    @Expose
    private List<String> idsRol;
    @Expose
    private String categoryName;
    @Expose
    private short categoryNumber;

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getIdsRol() {
        return this.idsRol;
    }

    public void setIdsRol(List<String> idsRol) {
        this.idsRol = idsRol;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryNumber(short categoryNumber) {
        this.categoryNumber = categoryNumber;
    }

    public short getCategoryNumber() {
        return categoryNumber;
    }
}
