package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class AlertDTO extends ReferenceDTO{
    @Expose
    private boolean activated;
    @Expose
    private String subject;
    @Expose
    private String message;
    @Expose
    private short days;
    
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
    
}
