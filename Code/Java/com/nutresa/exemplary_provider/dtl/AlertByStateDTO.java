package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class AlertByStateDTO {
    private final String form = "AlertByState";
    @Expose
    private String id;
    @Expose
    private String alert;
    @Expose
    private boolean activated;
    @Expose
    private String subject;
    @Expose
    private String message;
    @Expose
    private short days;
    
    public String getAlert() {
        return alert;
    }
    
    public void setAlert(String alert) {
        this.alert = alert;
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
        return form;
    }
    
    public String getId() {
        return id;
    }
    
}
