package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class SupplierByCallDTO {
    @Expose
    private String id;
    @Expose
    private String idCall;
    @Expose
    private String idSurvey;
    @Expose
    private String idSupplier;
    @Expose
    private boolean participateInCall;
    @Expose
    private String reasonForNotParticipation;
    @Expose
    private boolean lockedByModification;
    @Expose
    private String oldIdCompanySize;
    @Expose
    private String state = "DOING";

    public String getIdCall() {
        return idCall;
    }

    public void setIdCall(String idCall) {
        this.idCall = idCall;
    }

    public String getIdSurvey() {
        return idSurvey;
    }

    public void setIdSurvey(String idSurvey) {
        this.idSurvey = idSurvey;
    }

    public String getIdSupplier() {
        return idSupplier;
    }

    public void setIdSupplier(String idSupplier) {
        this.idSupplier = idSupplier;
    }

    public boolean isParticipateInCall() {
        return participateInCall;
    }

    public void setParticipateInCall(boolean participateInCall) {
        this.participateInCall = participateInCall;
    }

    public String getReasonForNotParticipation() {
        return reasonForNotParticipation;
    }

    public void setReasonForNotParticipation(String reasonForNotParticipation) {
        this.reasonForNotParticipation = reasonForNotParticipation;
    }

    public boolean isLockedByModification() {
        return lockedByModification;
    }

    public void setLockedByModification(boolean lockedByModification) {
        this.lockedByModification = lockedByModification;
    }

    public String getOldIdCompanySize() {
        return oldIdCompanySize;
    }

    public void setOldIdCompanySize(String oldIdCompanySize) {
        this.oldIdCompanySize = oldIdCompanySize;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getId() {
        return id;
    }

}
