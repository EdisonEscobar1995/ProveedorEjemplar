package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class UserDTO extends MasterDTO {
    @Expose
    private List<String> idRols;
    @Expose
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getIdRols() {
        return idRols;
    }

    public void setIdRols(List<String> idRols) {
        this.idRols = idRols;
    }

}
