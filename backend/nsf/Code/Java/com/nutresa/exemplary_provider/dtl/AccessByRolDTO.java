package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class AccessByRolDTO {
    @Expose
    private String id;
    @Expose
    private String idRol;
    @Expose
    private String idAccess;

    public String getIdRol() {
        return idRol;
    }

    public void setIdRol(String idRol) {
        this.idRol = idRol;
    }

    public String getIdAccess() {
        return idAccess;
    }

    public void setIdAccess(String idAccess) {
        this.idAccess = idAccess;
    }

    public String getId() {
        return id;
    }

}
