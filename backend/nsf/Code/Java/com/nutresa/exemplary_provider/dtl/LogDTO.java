package com.nutresa.exemplary_provider.dtl;

import java.util.Date;

import com.google.gson.annotations.Expose;
import com.nutresa.exemplary_provider.utils.Common;

public class LogDTO implements DTO {
    @Expose
    private String id;
    @Expose
    private Date date;
    @Expose
    private String entity;
    @Expose
    private String type;
    @Expose
    private String message;
    @Expose
    private String stackTrace;

    public LogDTO() {

    }

    public LogDTO(ErrorType type, String entity, String message, Exception exception) {
        setDate(new Date());
        this.type = type.get();
        this.entity = entity;
        this.message = message;
        if (null != exception) {
            stackTrace = Common.getStackTrace(exception);
        }
    }
    
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEntity() {
        return this.entity;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }

    public String getType() {
        return this.type;
    }

    public void setType(ErrorType type) {
        this.type = type.get();
    }
    public String getMessage() {
        return this.message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getStackTrace() {
        return this.stackTrace;
    }
    public void setStackTrace(String stackTrace) {
        this.stackTrace = stackTrace;
    }

    public void setStackTrace(Exception exception) {
        this.stackTrace = exception.getStackTrace().toString();
    }
    
    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public enum ErrorType {
        ERROR("Error"), WARNING("Warning"), INFORMATION("Information"), DEBUG("Debug");

        private final String type;

        ErrorType(String type) {
            this.type = type;
        }

        public String get() {
            return type;
        }

        public String toString() {
            return type;
        }

    }
}