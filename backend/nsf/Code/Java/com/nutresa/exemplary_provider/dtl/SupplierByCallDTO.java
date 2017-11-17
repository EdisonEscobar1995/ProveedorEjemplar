package com.nutresa.exemplary_provider.dtl;

public class SupplierByCallDTO {
    private String id;
    private String idCall;
    private String idSurvey;
    private String idSupplier;
    private boolean participateInCall;
    private String reasonForNotParticipation;
    private boolean lockedByModification;
    private String oldIdCompanySize;

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

    public String getId() {
        return id;
    }

}
