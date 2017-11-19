package com.nutresa.exemplary_provider.dtl;

public class QuestionBySurveyDTO {
    private String id;
    private String idSurvey;
    private String idQuestion;

    public String getIdSurvey() {
        return idSurvey;
    }

    public void setIdSurvey(String idSurvey) {
        this.idSurvey = idSurvey;
    }

    public String getIdQuestion() {
        return idQuestion;
    }

    public void setIdQuestion(String idQuestion) {
        this.idQuestion = idQuestion;
    }

    public String getId() {
        return id;
    }

}
