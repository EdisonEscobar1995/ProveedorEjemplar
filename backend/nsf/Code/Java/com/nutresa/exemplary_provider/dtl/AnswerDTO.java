package com.nutresa.exemplary_provider.dtl;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.annotations.Expose;

public class AnswerDTO {
    @Expose
    private String id;
    @Expose
    private String idSupplierByCall;
    @Expose
    private String idSurvey;
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
    private List<String> idAttachment;
    @Expose
    private List<AttachmentDTO> attachment;

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

    public String getIdSurvey() {
        return idSurvey;
    }

    public void setIdSurvey(String idSurvey) {
        this.idSurvey = idSurvey;
    }

    public String getId() {
        return id;
    }

    public List<String> getIdAttachment() {
        return idAttachment;
    }

    public void autoSetIdAttachment() {
        this.idAttachment = new ArrayList<String>();
        if (null != this.attachment) {
            for (AttachmentDTO document : this.attachment) {
                this.idAttachment.add(document.getId());
            }
        }
    }

    public List<AttachmentDTO> getAttachment() {
        return attachment;
    }

    public void setAttachment(List<AttachmentDTO> attachment) {
        this.attachment = attachment;
    }

}
