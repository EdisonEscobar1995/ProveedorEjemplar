package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class SystemDTO {
    @Expose
    private String id;
    @Expose
    private Integer rotationTime;
    @Expose
    private String title;
    @Expose
    private String content;
    @Expose
    private List<String> images;
    @Expose
    private String informationProgram;
    @Expose
    private String messageByChangeSizeCompany;
    @Expose
    private String inputPoll;
    @Expose
    private String uploadPathApplication;
    @Expose
    private String namesPathApplication;
    @Expose
    private String supplierPathApplication;
    @Expose
    private String filesPathApplication;
    @Expose
    private short uploadMaxFilesize;
    @Expose
    private List<String> uploadExtensions;

    public String getId() {
        return id;
    }

    public Integer getRotationTime() {
        return rotationTime;
    }

    public void setRotationTime(Integer rotationTime) {
        this.rotationTime = rotationTime;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getImage() {
        return images;
    }

    public void setImage(List<String> images) {
        this.images = images;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String getSupplierPathApplication() {
        return supplierPathApplication;
    }

    public void setSupplierPathApplication(String supplierPathApplication) {
        this.supplierPathApplication = supplierPathApplication;
    }

    public String getInformationProgram() {
        return informationProgram;
    }

    public void setInformationProgram(String informationProgram) {
        this.informationProgram = informationProgram;
    }

    public String getMessageByChangeSizeCompany() {
        return messageByChangeSizeCompany;
    }

    public void setMessageByChangeSizeCompany(String messageByChangeSizeCompany) {
        this.messageByChangeSizeCompany = messageByChangeSizeCompany;
    }

    public String getInputPoll() {
        return inputPoll;
    }

    public void setInputPoll(String inputPool) {
        this.inputPoll = inputPool;
    }

    public short getUploadMaxFilesize() {
        return uploadMaxFilesize;
    }

    public void setUploadMaxFilesize(short uploadMaxFilesize) {
        this.uploadMaxFilesize = uploadMaxFilesize;
    }

    public void setUploadExtensions(List<String> uploadExtensions) {
        this.uploadExtensions = uploadExtensions;
    }

    public List<String> getUploadExtensions() {
        return uploadExtensions;
    }

    public void setUploadPathApplication(String uploadPathApplication) {
        this.uploadPathApplication = uploadPathApplication;
    }

    public String getUploadPathApplication() {
        return uploadPathApplication;
    }

    public void setNamesPathApplication(String namesPathApplication) {
        this.namesPathApplication = namesPathApplication;
    }

    public String getNamesPathApplication() {
        return namesPathApplication;
    }

    public void setFilesPathApplication(String filesPathApplication) {
        this.filesPathApplication = filesPathApplication;
    }

    public String getFilesPathApplication() {
        return filesPathApplication;
    }

}