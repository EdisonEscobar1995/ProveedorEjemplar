package com.nutresa.exemplary_provider.dtl;

import java.util.Date;
import java.util.List;

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
    private String participateInCall;
    @Expose
    private boolean acceptedPolicy;
    @Expose
    private String reasonForNotParticipation;
    @Expose
    private String nameWhoSayDontParticipate;
    @Expose
    private String emailWhoSayDontParticipate;
    @Expose
    private boolean lockedByModification;
    @Expose
    private Date dateLocked;
    @Expose
    private Date dateUnLocked;
    @Expose
    private String oldIdCompanySize;
    @Expose
    private String idState;
    @Expose
    private boolean invitedToCall;
    @Expose
    private Date dateAssignedToEvaluator;
    @Expose
    private String whoEvaluate;
    @Expose
    private String whoEvaluateOfTechnicalTeam;
    @Expose
    private List<String> idsDimension;
    
    public List<String> getIdsDimension() {
		return idsDimension;
	}

	public void setIdsDimension(List<String> idsDimension) {
		this.idsDimension = idsDimension;
	}

	public List<String> getPercentsDimension() {
		return percentsDimension;
	}

	public void setPercentsDimension(List<String> percentsDimension) {
		this.percentsDimension = percentsDimension;
	}

	@Expose
    private List<String> percentsDimension;    

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

    public String getIdState() {
        return idState;
    }

    public void setIdState(String idState) {
        this.idState = idState;
    }

    public String getId() {
        return id;
    }

    public Date getDateUnLocked() {
        return dateUnLocked;
    }

    public void setDateUnLocked(Date notifiedLocked) {
        this.dateUnLocked = notifiedLocked;
    }

    public void setDateLocked(Date dateLocked) {
        this.dateLocked = dateLocked;
    }

    public Date getDateLocked() {
        return dateLocked;
    }

    public void setInvitedToCall(boolean invitedToCall) {
        this.invitedToCall = invitedToCall;
    }

    public boolean isInvitedToCall() {
        return invitedToCall;
    }

    public void setParticipateInCall(String participateInCall) {
        this.participateInCall = participateInCall;
    }

    public String getParticipateInCall() {
        return participateInCall;
    }

    public void setNameWhoSayDontParticipate(String nameWhoSayDontParticipate) {
        this.nameWhoSayDontParticipate = nameWhoSayDontParticipate;
    }

    public String getNameWhoSayDontParticipate() {
        return nameWhoSayDontParticipate;
    }

    public void setEmailWhoSayDontParticipate(String emailWhoSayDontParticipate) {
        this.emailWhoSayDontParticipate = emailWhoSayDontParticipate;
    }

    public String getEmailWhoSayDontParticipate() {
        return emailWhoSayDontParticipate;
    }

    public void setDateAssignedToEvaluator(Date dateAssignedToEvaluator) {
        this.dateAssignedToEvaluator = dateAssignedToEvaluator;
    }

    public Date getDateAssignedToEvaluator() {
        return dateAssignedToEvaluator;
    }

    public void setWhoEvaluate(String whoEvaluate) {
        this.whoEvaluate = whoEvaluate;
    }

    public String getWhoEvaluate() {
        return whoEvaluate;
    }

    public void setWhoEvaluateOfTechnicalTeam(String whoEvaluateOfTechnicalTeam) {
        this.whoEvaluateOfTechnicalTeam = whoEvaluateOfTechnicalTeam;
    }

    public String getWhoEvaluateOfTechnicalTeam() {
        return whoEvaluateOfTechnicalTeam;
    }

	public void setAcceptedPolicy(boolean acceptedPolicy) {
		this.acceptedPolicy = acceptedPolicy;
	}

	public boolean isAcceptedPolicy() {
		return acceptedPolicy;
	}
}
