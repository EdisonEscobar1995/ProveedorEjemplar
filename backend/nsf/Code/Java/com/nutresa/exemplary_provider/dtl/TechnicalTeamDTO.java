package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class TechnicalTeamDTO {
    @Expose
    private String id;
    @Expose
    private String idUser;
    @Expose
    private String idSupply;
    @Expose
    private String idCategory;
    @Expose
    private String idCountry;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getIdSupply() {
        return idSupply;
    }

    public void setIdSupply(String idSupply) {
        this.idSupply = idSupply;
    }

    public String getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(String idCategory) {
        this.idCategory = idCategory;
    }

    public String getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(String idCountry) {
        this.idCountry = idCountry;
    }

}
