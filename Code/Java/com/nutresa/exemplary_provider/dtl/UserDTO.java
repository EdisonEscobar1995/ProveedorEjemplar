package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public abstract class UserDTO {
    @Expose
    private String id;
    @Expose
    private String name;
    private List<RolDTO> rol;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public List<RolDTO> getRol() {
        return rol;
    }

    public void setRol(List<RolDTO> rol) {
        this.rol = rol;
    }
    

}
