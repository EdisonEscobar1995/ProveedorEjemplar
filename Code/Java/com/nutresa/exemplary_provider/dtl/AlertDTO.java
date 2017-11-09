package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class AlertDTO {
    private static final String FORM = "AlertByState";
    @Expose
    private String id;
    @Expose
    private String nameAlert;
    @Expose
    private boolean activated;
    @Expose
    private String subject;
    @Expose
    private String message;
    @Expose
    private short days;
    
    public String getAlert() {
        return nameAlert;
    }
    
    public void setAlert(String alert) {
        this.nameAlert = alert;
    }
    
    public boolean isActivated() {
        return activated;
    }
    
    public void setActivated(boolean activated) {
        this.activated = activated;
    }
    
    public String getSubject() {
        return subject;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public short getDays() {
        return days;
    }
    
    public void setDays(short days) {
        this.days = days;
    }
    
    public String getForm() {
        return FORM;
    }
    
    public String getId() {
        return id;
    }
    
}
