package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class UserByRolDTO {
    @Expose
    private String id;
    @Expose
    private String idUser;
    @Expose
    private String idRol;

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getIdRol() {
        return idRol;
    }

    public void setIdRol(String idRol) {
        this.idRol = idRol;
    }

    public String getId() {
        return id;
    }

}
