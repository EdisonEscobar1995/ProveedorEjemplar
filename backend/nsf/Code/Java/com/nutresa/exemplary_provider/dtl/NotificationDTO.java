package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.nutresa.exemplary_provider.dtl.AttachmentDTO;

import com.google.gson.annotations.Expose;

public class NotificationDTO extends MasterDTO {
    @Expose
    private String idBanner;
    @Expose
    private AttachmentDTO banner;
    @Expose
    private String idFooter;
    @Expose
    private AttachmentDTO footer;
    @Expose
    private String subject;
    @Expose
    private String message;
    @Expose
    private List<String> withCopy;
    @Expose
    private String alias;

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

    public String getAlias() {
        return alias;
    }

    public String getIdBanner() {
        return idBanner;
    }

    public void setIdBanner(String idBanner) {
        this.idBanner = idBanner;
    }

    public String getIdFooter() {
        return idFooter;
    }

    public void setIdFooter(String idFooter) {
        this.idFooter = idFooter;
    }

    public void setBanner(AttachmentDTO banner) {
        this.banner = banner;
    }

    public AttachmentDTO getBanner() {
        return banner;
    }

    public void setFooter(AttachmentDTO footer) {
        this.footer = footer;
    }

    public AttachmentDTO getFooter() {
        return footer;
    }

}
