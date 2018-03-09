package com.nutresa.exemplary_provider.dtl;

import java.util.Date;
import java.util.List;

import com.google.gson.annotations.Expose;

public class TechnicalTeamAnswerDTO {
    @Expose
    private String id;
    @Expose
    private String idSupplierByCall;
    @Expose
    private String idService;
    @Expose
    private List<String> idItem;
    @Expose
    private List<String> idEvaluationScaleTechnicalTeam;
    @Expose
    private String commentTecnicalTeam;
    @Expose
    private Date dateResponseTechnicalTeamMember;
    @Expose
    private List<String> idEvaluationScaleManagementTeam;
    @Expose
    private String commentManagementTeam;
    @Expose
    private Date dateResponseManagementTeamMember;

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

    public List<String> getIdItem() {
        return idItem;
    }

    public void setIdItem(List<String> idItem) {
        this.idItem = idItem;
    }

    public List<String> getIdEvaluationScaleTechnicalTeam() {
        return idEvaluationScaleTechnicalTeam;
    }

    public void setIdEvaluationScaleTechnicalTeam(List<String> idEvaluationScaleTechnicalTeam) {
        this.idEvaluationScaleTechnicalTeam = idEvaluationScaleTechnicalTeam;
    }

    public String getCommentTecnicalTeam() {
        return commentTecnicalTeam;
    }

    public void setCommentTecnicalTeam(String commentTecnicalTeam) {
        this.commentTecnicalTeam = commentTecnicalTeam;
    }

    public List<String> getIdEvaluationScaleManagementTeam() {
        return idEvaluationScaleManagementTeam;
    }

    public void setIdEvaluationScaleManagementTeam(List<String> idEvaluationScaleManagementTeam) {
        this.idEvaluationScaleManagementTeam = idEvaluationScaleManagementTeam;
    }

    public String getCommentManagementTeam() {
        return commentManagementTeam;
    }

    public void setCommentManagementTeam(String commentManagementTeam) {
        this.commentManagementTeam = commentManagementTeam;
    }

    public Date getDateResponseTechnicalTeamMember() {
        return dateResponseTechnicalTeamMember;
    }

    public void setDateResponseTechnicalTeamMember(Date dateResponseTechnicalTeamMember) {
        this.dateResponseTechnicalTeamMember = dateResponseTechnicalTeamMember;
    }

    public void setDateResponseManagementTeamMember(Date dateResponseManagementTeamMember) {
        this.dateResponseManagementTeamMember = dateResponseManagementTeamMember;
    }

    public Date getDateResponseManagementTeamMember() {
        return dateResponseManagementTeamMember;
    }

}
