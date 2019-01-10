package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class SurveyDTO {
    @Expose
    private String id;
    @Expose
    private String idSupply;
    @Expose
    private String idCompanySize;
    @Expose
    private List<QuestionDTO> question;
    @Expose
    private String idCall;

    public List<QuestionDTO> getQuestion() {
        return question;
    }

    public void setQuestion(List<QuestionDTO> question) {
        this.question = question;
    }
    
    public void setId(String id) {
    	this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getIdCompanySize() {
        return idCompanySize;
    }

    public void setIdCompanySize(String idCompanySize) {
        this.idCompanySize = idCompanySize;
    }

    public String getIdSupply() {
        return idSupply;
    }

    public void setIdSupply(String idSupply) {
        this.idSupply = idSupply;
    }

	public void setIdCall(String idCall) {
		this.idCall = idCall;
	}

	public String getIdCall() {
		return idCall;
	}

}
