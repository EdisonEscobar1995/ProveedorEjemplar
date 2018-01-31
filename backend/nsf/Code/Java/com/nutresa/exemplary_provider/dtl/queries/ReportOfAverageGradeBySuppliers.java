package com.nutresa.exemplary_provider.dtl.queries;

import java.util.List;

import com.google.gson.annotations.Expose;

public class ReportOfAverageGradeBySuppliers {
    @Expose
    private String sapCode;
    @Expose
    private String nit;
    @Expose
    private String name;
    @Expose
    private double totalScore;
    @Expose
    private double totalScoreOfSupplier;
    @Expose
    private double expectedScore;
    @Expose
    private List<SummarySurvey> summarySurvey;

    public String getSapCode() {
        return sapCode;
    }

    public void setSapCode(String sapCode) {
        this.sapCode = sapCode;
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(double totalScore) {
        this.totalScore = totalScore;
    }

    public double getTotalScoreOfSupplier() {
        return totalScoreOfSupplier;
    }

    public void setTotalScoreOfSupplier(short totalScoreOfSupplier, short totalExpectedScoreOfSupplier) {
        if(totalExpectedScoreOfSupplier > 0){
            this.totalScoreOfSupplier = (double)totalScoreOfSupplier / (double)totalExpectedScoreOfSupplier;
        } else {
            this.totalScoreOfSupplier = 0D;
        }
    }

    public double getExpectedScore() {
        return expectedScore;
    }

    public void setExpectedScore(double expectedScore) {
        this.expectedScore = expectedScore;
    }

    public List<SummarySurvey> getSummarySurvey() {
        return summarySurvey;
    }

    public void setSummarySurvey(List<SummarySurvey> summarySurvey) {
        this.summarySurvey = summarySurvey;
    }

    public class SummarySurvey {
        @Expose
        private String dimension;
        @Expose
        private String criterion;
        @Expose
        private String question;
        @Expose
        private String answer;
        @Expose
        private short scoreOfSupplier;
        @Expose
        private short expectedScore;
        @Expose
        private String commentSupplier;

        public String getDimension() {
            return dimension;
        }

        public void setDimension(String dimenssion) {
            this.dimension = dimenssion;
        }

        public String getCriterion() {
            return criterion;
        }

        public void setCriterion(String criterion) {
            this.criterion = criterion;
        }

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public String getAnswer() {
            return answer;
        }

        public void setAnswer(String answer) {
            this.answer = answer;
        }

        public short getScoreOfSupplier() {
            return scoreOfSupplier;
        }

        public void setScoreOfSupplier(short scoreOfSupplier) {
            this.scoreOfSupplier = scoreOfSupplier;
        }

        public short getExpectedScore() {
            return expectedScore;
        }

        public void setExpectedScore(short expectedScore) {
            this.expectedScore = expectedScore;
        }

        public void setCommentSupplier(String commentSupplier) {
            this.commentSupplier = commentSupplier;
        }

        public String getCommentSupplier() {
            return commentSupplier;
        }

    }
}
