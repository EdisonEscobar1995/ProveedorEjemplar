package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class NotificationDTO {
    private static final String FORM = "frNotification";
    @Expose
    private String id;
    @Expose
    private String banner;
    @Expose
    private String subject;
    @Expose
    private String message;
    @Expose
    private List<String> withCopy;

    public String getForm() {
        return FORM;
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

    public List<String> getWithCopy() {
        return withCopy;
    }

    public void setWithCopy(List<String> withCopy) {
        this.withCopy = withCopy;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
