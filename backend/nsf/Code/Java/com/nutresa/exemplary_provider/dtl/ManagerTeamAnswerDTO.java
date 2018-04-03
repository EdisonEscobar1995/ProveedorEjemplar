package com.nutresa.exemplary_provider.dtl;

import java.util.Date;

import com.google.gson.annotations.Expose;

public class ManagerTeamAnswerDTO {
    @Expose
    private String id;
    @Expose
    private String idSupplierByCall;
    @Expose
    private String whoEvaluate;
    @Expose
    private String idEvaluationScale;
    @Expose
    private String comment;
    @Expose
    private Date dateResponse;

    public void setWhoEvaluate(String whoEvaluate) {
        this.whoEvaluate = whoEvaluate;
    }

    public String getWhoEvaluate() {
        return whoEvaluate;
    }

    public String getIdEvaluationScale() {
        return idEvaluationScale;
    }

    public void setIdEvaluationScale(String idEvaluationScale) {
        this.idEvaluationScale = idEvaluationScale;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setDateResponse(Date dateResponse) {
        this.dateResponse = dateResponse;
    }

    public Date getDateResponse() {
        return dateResponse;
    }

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
}
