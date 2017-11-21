package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class AnswerDTO {
    @Expose
    private String idSupplierByCall;
    @Expose
    private String idQuestion;
    @Expose
    private String idOptionSupplier;
    @Expose
    private String responseSupplier;
    @Expose
    private String commentSupplier;
    @Expose
    private String idOptionEvaluator;
    @Expose
    private String responseEvaluator;
    @Expose
    private String commentEvaluator;
    @Expose
    private String idAttachment;

    public String getIdSupplierByCall() {
        return idSupplierByCall;
    }

    public void setIdSupplierByCall(String idSupplierByCall) {
        this.idSupplierByCall = idSupplierByCall;
    }

    public String getIdOptionSupplier() {
        return idOptionSupplier;
    }

    public void setIdOptionSupplier(String idOptionSupplier) {
        this.idOptionSupplier = idOptionSupplier;
    }

    public String getIdOptionEvaluator() {
        return idOptionEvaluator;
    }

    public void setIdOptionEvaluator(String idOptionEvaluator) {
        this.idOptionEvaluator = idOptionEvaluator;
    }

    public String getCommentSupplier() {
        return commentSupplier;
    }

    public void setCommentSupplier(String commentSupplier) {
        this.commentSupplier = commentSupplier;
    }

    public String getCommentEvaluator() {
        return commentEvaluator;
    }

    public void setCommentEvaluator(String commentEvaluator) {
        this.commentEvaluator = commentEvaluator;
    }

    public void setIdQuestion(String idQuestion) {
        this.idQuestion = idQuestion;
    }

    public String getIdQuestion() {
        return idQuestion;
    }

    public String getIdAttachment() {
        return idAttachment;
    }

    public void setIdAttachment(String idAttachment) {
        this.idAttachment = idAttachment;
    }

    public String getResponseSupplier() {
        return responseSupplier;
    }

    public void setResponseSupplier(String responseSupplier) {
        this.responseSupplier = responseSupplier;
    }

    public String getResponseEvaluator() {
        return responseEvaluator;
    }

    public void setResponseEvaluator(String responseEvaluator) {
        this.responseEvaluator = responseEvaluator;
    }

}
