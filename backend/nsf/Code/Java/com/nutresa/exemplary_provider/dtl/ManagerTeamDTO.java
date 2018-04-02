package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class ManagerTeamDTO {
    @Expose
    private String id;
    @Expose
    private String idUser;
    @Expose
    private String idCall;

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

    public String getIdCall() {
        return idCall;
    }

    public void setIdCall(String idCall) {
        this.idCall = idCall;
    }

}
