package com.nutresa.app.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class NotificationDTO {
    private String form = "frNotification";
	@Expose
    private String id;
    @Expose
    private String banner;
    @Expose
    private String subject;
    @Expose
    private String message;
    @Expose
    private List<String> notifyTo;
    
	public String getForm() {
		return form;
	}

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
    
    public List<String> getNotifyTo() {
        return notifyTo;
    }
    
    public void setNotifyTo(List<String> notifyTo) {
        this.notifyTo = notifyTo;
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
}
