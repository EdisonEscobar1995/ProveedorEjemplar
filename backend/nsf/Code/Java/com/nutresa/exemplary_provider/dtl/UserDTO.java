package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public abstract class UserDTO extends MasterDTO {
    @Expose
    private List<String> rolsId;
    @Expose
    private List<RolDTO> rols;

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

}
