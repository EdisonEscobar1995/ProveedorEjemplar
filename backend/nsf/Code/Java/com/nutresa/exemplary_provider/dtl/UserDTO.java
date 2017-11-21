package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public abstract class UserDTO extends MasterDTO {
    @Expose
    private List<String> rolsId;
    @Expose
    private List<RolDTO> rols;
    private String email;

    public List<RolDTO> getRol() {
        return rols;
    }

    public void setRol(List<RolDTO> rols) {
        this.rols = rols;
    }

    public void setRolsId(List<String> rolsId) {
        this.rolsId = rolsId;
    }

    public List<String> getRolsId() {
        return rolsId;
    }

    public List<RolDTO> getRols() {
        return rols;
    }

    public void setRols(List<RolDTO> rols) {
        this.rols = rols;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
