package com.nutresa.exemplary_provider.dtl;

import java.util.Date;
import java.util.List;

import com.google.gson.annotations.Expose;

public class CallDTO {
    @Expose
    private String id;
    @Expose
    private short year;
    @Expose
    private Date dateToFinishCall;
    @Expose
    private Date deadlineToMakeSurvey;
    @Expose
    private Date deadlineToMakeSurveyEvaluator;
    @Expose
    private Date deadlineToMakeSurveyTecniqueCommittee;
    @Expose
    private Date deadlineToMakeSurveyManagementCommittee;
    @Expose
    private List<UserDTO> managementCommittee;
    @Expose
    private List<SupplierDTO> supplier;
    @Expose
    private boolean activated;

    public Date getDateToFinishCall() {
        return dateToFinishCall;
    }

    public void setDateToFinishCall(Date dateToFinishCall) {
        this.dateToFinishCall = dateToFinishCall;
    }

    public Date getDeadlineToMakeSurvey() {
        return deadlineToMakeSurvey;
    }

    public void setDeadlineToMakeSurvey(Date deadlineToMakeSurvey) {
        this.deadlineToMakeSurvey = deadlineToMakeSurvey;
    }

    public Date getDeadlineToMakeSurveyEvaluator() {
        return deadlineToMakeSurveyEvaluator;
    }

    public void setDeadlineToMakeSurveyEvaluator(
            Date deadlineToMakeSurveyEvaluator) {
        this.deadlineToMakeSurveyEvaluator = deadlineToMakeSurveyEvaluator;
    }

    public Date getDeadlineToMakeSurveyTecniqueCommittee() {
        return deadlineToMakeSurveyTecniqueCommittee;
    }

    public void setDeadlineToMakeSurveyTecniqueCommittee(
            Date deadlineToMakeSurveyTecniqueCommittee) {
        this.deadlineToMakeSurveyTecniqueCommittee = deadlineToMakeSurveyTecniqueCommittee;
    }

    public Date getDeadlineToMakeSurveyManagementCommittee() {
        return deadlineToMakeSurveyManagementCommittee;
    }

    public void setDeadlineToMakeSurveyManagementCommittee(
            Date deadlineToMakeSurveyManagementCommittee) {
        this.deadlineToMakeSurveyManagementCommittee = deadlineToMakeSurveyManagementCommittee;
    }

    public List<UserDTO> getManagementCommittee() {
        return managementCommittee;
    }

    public void setManagementCommittee(List<UserDTO> managementCommittee) {
        this.managementCommittee = managementCommittee;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getId() {
        return id;
    }

    public List<SupplierDTO> getSupplier() {
        return supplier;
    }

    public void setSupplier(List<SupplierDTO> supplier) {
        this.supplier = supplier;
    }

    public short getYear() {
        return year;
    }

    public void setYear(short year) {
        this.year = year;
    }

}
