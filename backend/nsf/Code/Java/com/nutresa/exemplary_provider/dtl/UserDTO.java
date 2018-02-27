package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class UserDTO extends MasterDTO {
    @Expose
    private List<String> idRols;
    @Expose
    private String email;
    @Expose
    private List<String> idSupplies;
    @Expose
    private List<String> idCategories;
    @Expose
    private String idCountry;

    public List<String> getIdRols() {
        return idRols;
    }

    public void setIdRols(List<String> idRols) {
        this.idRols = idRols;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setIdCategories(List<String> idCategories) {
        this.idCategories = idCategories;
    }

    public List<String> getIdCategories() {
        return idCategories;
    }

    public void setIdSupplies(List<String> idSupplies) {
        this.idSupplies = idSupplies;
    }

    public List<String> getIdSupplies() {
        return idSupplies;
    }

    public void setIdCountry(String idCountry) {
        this.idCountry = idCountry;
    }

    public String getIdCountry() {
        return idCountry;
    }

}
