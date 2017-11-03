package com.nutresa.app.exemplary_provider.dtl;

import java.util.ArrayList;

import com.google.gson.annotations.Expose;

public class NotificationDTO {
    @Expose
    private String id;
    @Expose
    private String banner;
    @Expose
    private String subject;
    @Expose
    private String message;
    @Expose
    private ArrayList<String> notifyTo;
    
    public String getBanner() {
        return banner;
    }
    
    public void setBanner(String banner) {
        this.banner = banner;
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
    
    public ArrayList<String> getNotifyTo() {
        return notifyTo;
    }
    
    public void setNotifyTo(ArrayList<String> notifyTo) {
        this.notifyTo = notifyTo;
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
}
