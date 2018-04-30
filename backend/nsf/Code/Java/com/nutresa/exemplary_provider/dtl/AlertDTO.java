package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class AlertDTO extends MasterDTO {
    @Expose
    private String shortName;
    @Expose
    private boolean active;
    @Expose
    private String subject;
    @Expose
    private String message;
    @Expose
    private short days;

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

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isActive() {
        return active;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getShortName() {
        return shortName;
    }

}
