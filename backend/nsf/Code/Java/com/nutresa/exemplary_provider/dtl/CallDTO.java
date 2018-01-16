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
    private List<String> managementCommittee;
    @Expose
    private List<SupplierDTO> supplier;
    @Expose
    private boolean active;

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

    public void setDeadlineToMakeSurveyEvaluator(Date deadlineToMakeSurveyEvaluator) {
        this.deadlineToMakeSurveyEvaluator = deadlineToMakeSurveyEvaluator;
    }

    public Date getDeadlineToMakeSurveyTecniqueCommittee() {
        return deadlineToMakeSurveyTecniqueCommittee;
    }

    public void setDeadlineToMakeSurveyTecniqueCommittee(Date deadlineToMakeSurveyTecniqueCommittee) {
        this.deadlineToMakeSurveyTecniqueCommittee = deadlineToMakeSurveyTecniqueCommittee;
    }

    public Date getDeadlineToMakeSurveyManagementCommittee() {
        return deadlineToMakeSurveyManagementCommittee;
    }

    public void setDeadlineToMakeSurveyManagementCommittee(Date deadlineToMakeSurveyManagementCommittee) {
        this.deadlineToMakeSurveyManagementCommittee = deadlineToMakeSurveyManagementCommittee;
    }

    public List<String> getManagementCommittee() {
        return managementCommittee;
    }

    public void setManagementCommittee(List<String> managementCommittee) {
        this.managementCommittee = managementCommittee;
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

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isActive() {
        return active;
    }

    public boolean isNotCaducedDate(Date dateInCall, Date today) {
        boolean response = false;
        if (today.compareTo(dateInCall) < 0) {
            response = true;
        }

        return response;
    }
    
}