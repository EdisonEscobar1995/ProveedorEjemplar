package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class SystemDTO {
	private static final String FORM = "frSystem";
	@Expose
	private String id;
	@Expose
	private Integer rotationTime;
	@Expose
	private String title;
	@Expose
	private String content;
	@Expose
	private String image;
	@Expose
	private String host;
	@Expose
	private String informationProgram;
	@Expose
	private String messageByChangeSizeCompany;
	@Expose
	private String inputPoll;
	@Expose
	private short uploadMaxFilesize;
	@Expose
	private SizeCompanyDTO sizeCompany;

	public String getForm() {
		return FORM;
	}
    
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
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

    public SizeCompanyDTO getSizeCompany() {
        return sizeCompany;
    }

    public void setSizeCompany(SizeCompanyDTO sizeCompany) {
        this.sizeCompany = sizeCompany;
    }
	
}