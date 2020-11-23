package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CriterionPercentDTO {
    @Expose
    private String id;
    @Expose
    private String idCall;
    @Expose
    private String idSurvey;
    @Expose
    private String idDimension;
    @Expose
    private String idCriterion;
    @Expose
    private Integer percent;
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getIdCall() {
		return idCall;
	}
	public void setIdCall(String idCall) {
		this.idCall = idCall;
	}
	public String getIdSurvey() {
		return idSurvey;
	}
	public void setIdSurvey(String idSurvey) {
		this.idSurvey = idSurvey;
	}
	public String getIdDimension() {
		return idDimension;
	}
	public void setIdDimension(String idDimension) {
		this.idDimension = idDimension;
	}
	public String getIdCriterion() {
		return idCriterion;
	}
	public void setIdCriterion(String idCriterion) {
		this.idCriterion = idCriterion;
	}
	public Integer getPercent() {
		return percent;
	}
	public void setPercent(Integer percent) {
		this.percent = percent;
	}
    
}
