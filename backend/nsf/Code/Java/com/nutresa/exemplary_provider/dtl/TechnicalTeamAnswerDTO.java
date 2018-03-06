package com.nutresa.exemplary_provider.dtl;

import java.util.Date;

import com.google.gson.annotations.Expose;

public class TechnicalTeamAnswerDTO {
    @Expose
    private String id;
    @Expose
    private String idSupplierByCall;
    @Expose
    private String idService;
    @Expose
    private String idItem;
    @Expose
    private String idTechnicalTeamMember;
    @Expose
    private Date dateResponseTechnicalTeamMember;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdSupplierByCall() {
        return idSupplierByCall;
    }

    public void setIdSupplierByCall(String idSupplierByCall) {
        this.idSupplierByCall = idSupplierByCall;
    }

    public String getIdService() {
        return idService;
    }

    public void setIdService(String idService) {
        this.idService = idService;
    }

    public String getIdItem() {
        return idItem;
    }

    public void setIdItem(String idItem) {
        this.idItem = idItem;
    }

    public void setIdTechnicalTeamMember(String idTechnicalTeamMember) {
        this.idTechnicalTeamMember = idTechnicalTeamMember;
    }

    public String getIdTechnicalTeamMember() {
        return idTechnicalTeamMember;
    }

    public void setDateResponseTechnicalTeamMember(Date dateResponseTechnicalTeamMember) {
        this.dateResponseTechnicalTeamMember = dateResponseTechnicalTeamMember;
    }

    public Date getDateResponseTechnicalTeamMember() {
        return dateResponseTechnicalTeamMember;
    }

}
