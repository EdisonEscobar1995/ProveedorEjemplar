package com.nutresa.exemplary_provider.dtl;

public abstract class UserByRolDTO extends MasterDTO {
    private String idUser;
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

}
