package com.nutresa.exemplary_provider.dtl;

import java.util.List;

public class AnswerDTO {
    private String idSupplierByCall;
    private String idOptionSupplier;
    private String idOptionEvaluator;
    private String commentSupplier;
    private String commentEvaluator;
    private List<String> attached;

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

    public List<String> getAttached() {
        return attached;
    }

    public void setAttached(List<String> attached) {
        this.attached = attached;
    }

}
