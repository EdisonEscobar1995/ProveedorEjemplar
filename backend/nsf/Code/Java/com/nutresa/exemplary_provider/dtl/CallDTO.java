package com.nutresa.exemplary_provider.dtl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.google.gson.annotations.Expose;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

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
    private Date deadlineToMakeSurveyTechnicalTeam;
    @Expose
    private Date deadlineToMakeSurveyManagerTeam;
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

    public Date getDeadlineToMakeSurveyTechnicalTeam() {
        return deadlineToMakeSurveyTechnicalTeam;
    }

    public void setDeadlineToMakeSurveyTechnicalTeam(Date deadlineToMakeSurveyTechnicalTeam) {
        this.deadlineToMakeSurveyTechnicalTeam = deadlineToMakeSurveyTechnicalTeam;
    }

    public Date getDeadlineToMakeSurveyManagerTeam() {
        return deadlineToMakeSurveyManagerTeam;
    }

    public void setDeadlineToMakeSurveyManagerTeam(Date deadlineToMakeSurveyManagerTeam) {
        this.deadlineToMakeSurveyManagerTeam = deadlineToMakeSurveyManagerTeam;
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

    public boolean isCaducedDateToFinishCall() throws HandlerGenericException {
        return isCaducedDate(this.dateToFinishCall, new Date());
    }

    public boolean isCaducedDeadLineToMakeSurvey() throws HandlerGenericException {
        return isCaducedDate(this.deadlineToMakeSurvey, new Date());
    }

    public boolean isCaducedDeadLineToMakeSurveyEvaluator() throws HandlerGenericException {
        return isCaducedDate(this.deadlineToMakeSurveyEvaluator, new Date());
    }

    public boolean isCaducedDeadLineToMakeSurveyTechnicalTeam() throws HandlerGenericException {
        return isCaducedDate(this.deadlineToMakeSurveyTechnicalTeam, new Date());
    }

    public boolean isCaducedDeadLineToMakeSurveyManagerTeam() throws HandlerGenericException {
        return isCaducedDate(this.deadlineToMakeSurveyManagerTeam, new Date());
    }

    private boolean isCaducedDate(Date dateToCompare, Date today) throws HandlerGenericException {
        boolean response = false;
        if (null == dateToCompare) {
            throw new HandlerGenericException("DATE_WITHOUT_FIXING");
        }
        
        Calendar dateToCompareCalendar = Calendar.getInstance();
        dateToCompareCalendar.setTime(dateToCompare);
        
        Calendar actualDate = Calendar.getInstance();
        actualDate.setTime(today);
        
        dateToCompareCalendar.set(Calendar.YEAR, dateToCompareCalendar.get(Calendar.YEAR));
        dateToCompareCalendar.set(Calendar.MONTH, dateToCompareCalendar.get(Calendar.MONTH));
        dateToCompareCalendar.set(Calendar.DATE, dateToCompareCalendar.get(Calendar.DATE));
        dateToCompareCalendar.set(Calendar.HOUR_OF_DAY, 23);
        dateToCompareCalendar.set(Calendar.MINUTE, 58);
        
        if (actualDate.compareTo(dateToCompareCalendar) > 0) {
            response = true;
        }

        return response;
    }

}
