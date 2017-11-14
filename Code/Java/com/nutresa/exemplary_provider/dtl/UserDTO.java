package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public abstract class UserDTO extends ReferenceDTO{
    @Expose
    private List<RolDTO> rol;

    public List<RolDTO> getRol() {
        return rol;
    }

    public void setRol(List<RolDTO> rol) {
        this.rol = rol;
    }

}
