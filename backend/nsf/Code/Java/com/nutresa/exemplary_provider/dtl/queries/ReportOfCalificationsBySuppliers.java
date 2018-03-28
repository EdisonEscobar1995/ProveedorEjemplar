package com.nutresa.exemplary_provider.dtl.queries;

import java.util.List;

import com.google.gson.annotations.Expose;

public class ReportOfCalificationsBySuppliers {
    @Expose
    private String idSupplier;
    @Expose
    private String idSupplierByCall;
    @Expose
    private String sapCode;
    @Expose
    private String nit;
    @Expose
    private String name;
    @Expose
    private String supply;
    @Expose
    private String category;
    @Expose
    private String companySize;
    @Expose
    private double scoreOfSupplier;
    @Expose
    private double totalScoreOfSupplier;
    @Expose
    private double expectedScoreSupplier;
    @Expose
    private double expectedScoreEvaluator;
    @Expose
    private double scoreOfEvaluator;
    @Expose
    private double totalScoreOfEvaluator;
    @Expose
    private List<SummarySurvey> summarySurvey;
    @Expose
    private List<Service> services;
    @Expose
    private double totalScoreInService;

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
        return scoreOfSupplier;
    }

    public void setScoreOfSupplier(double scoreOfSupplier) {
        this.scoreOfSupplier = scoreOfSupplier;
    }

    public double getTotalScoreOfSupplier() {
        return totalScoreOfSupplier;
    }

    public void setTotalScoreOfSupplier(short totalScoreOfSupplier, short totalExpectedScoreOfSupplier) {
        this.totalScoreOfSupplier = calculateTotalScore(totalScoreOfSupplier, totalExpectedScoreOfSupplier);
    }

    public void setScoreOfEvaluator(double scoreOfEvaluator) {
        this.scoreOfEvaluator = scoreOfEvaluator;
    }

    public double getScoreOfEvaluator() {
        return scoreOfEvaluator;
    }

    public void setTotalScoreOfEvaluator(short totalScore, short totalExpectedScore) {
        this.totalScoreOfEvaluator = calculateTotalScore(totalScore, totalExpectedScore);
    }

    public double getTotalScoreOfEvaluator() {
        return totalScoreOfEvaluator;
    }

    private double calculateTotalScore(short totalScore, short totalExpectedScore) {
        double scoreCalculated = 0D;
        if (totalScore < 0) {
            scoreCalculated = -1D;
        } else {
            if (totalExpectedScore > 0) {
                scoreCalculated = ((double) totalScore / (double) totalExpectedScore) * 100;
            }
        }

        return scoreCalculated;
    }

    public double getExpectedScoreSupplier() {
        return expectedScoreSupplier;
    }

    public void setExpectedScoreSupplier(double expectedScore) {
        this.expectedScoreSupplier = expectedScore;
    }

    public double getExpectedScoreEvaluator() {
        return expectedScoreEvaluator;
    }

    public void setExpectedScoreEvaluator(double expectedScore) {
        this.expectedScoreEvaluator = expectedScore;
    }

    public List<SummarySurvey> getSummarySurvey() {
        return summarySurvey;
    }

    public void setSummarySurvey(List<SummarySurvey> summarySurvey) {
        this.summarySurvey = summarySurvey;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public double getTotalScoreInService() {
        return totalScoreInService;
    }

    public void setTotalScoreInService(double totalScoreInService) {
        this.totalScoreInService = totalScoreInService;
    }

    public void setSupply(String supply) {
        this.supply = supply;
    }

    public String getSupply() {
        return supply;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public void setCompanySize(String companySize) {
        this.companySize = companySize;
    }

    public String getCompanySize() {
        return companySize;
    }

    public void setIdSupplier(String idSupplier) {
        this.idSupplier = idSupplier;
    }

    public String getIdSupplier() {
        return idSupplier;
    }

    public void setIdSupplierByCall(String idSupplierByCall) {
        this.idSupplierByCall = idSupplierByCall;
    }

    public String getIdSupplierByCall() {
        return idSupplierByCall;
    }

    public class SummarySurvey {
        @Expose
        private String dimension;
        @Expose
        private String criterion;
        @Expose
        private String question;
        @Expose
        private String questionType;
        @Expose
        private String answerSupplier;
        @Expose
        private String answerEvaluator;
        @Expose
        private short scoreOfSupplier;
        @Expose
        private short scoreOfEvaluator;
        @Expose
        private short expectedScoreSupplier;
        @Expose
        private short expectedScoreEvaluator;
        @Expose
        private String commentSupplier;
        @Expose
        private String commentEvaluator;

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

        public String getQuestionType() {
            return questionType;
        }

        public void setQuestionType(String questionType) {
            this.questionType = questionType;
        }

        public String getAnswerSupplier() {
            return answerSupplier;
        }

        public void setAnswerSupplier(String answer) {
            this.answerSupplier = answer;
        }

        public short getScoreOfSupplier() {
            return scoreOfSupplier;
        }

        public void setScoreOfSupplier(short scoreOfSupplier) {
            this.scoreOfSupplier = scoreOfSupplier;
        }

        public short getExpectedScoreSupplier() {
            return expectedScoreSupplier;
        }

        public void setExpectedScoreSupplier(short expectedScore) {
            this.expectedScoreSupplier = expectedScore;
        }

        public short getExpectedScoreEvaluator() {
            return expectedScoreEvaluator;
        }

        public void setExpectedScoreEvaluator(short expectedScore) {
            this.expectedScoreEvaluator = expectedScore;
        }

        public void setCommentSupplier(String commentSupplier) {
            this.commentSupplier = commentSupplier;
        }

        public String getCommentSupplier() {
            return commentSupplier;
        }

        public void setAnswerEvaluator(String answerEvaluator) {
            this.answerEvaluator = answerEvaluator;
        }

        public String getAnswerEvaluator() {
            return answerEvaluator;
        }

        public void setScoreOfEvaluator(short scoreOfEvaluator) {
            this.scoreOfEvaluator = scoreOfEvaluator;
        }

        public short getScoreOfEvaluator() {
            return scoreOfEvaluator;
        }

        public void setCommentEvaluator(String commentEvaluator) {
            this.commentEvaluator = commentEvaluator;
        }

        public String getCommentEvaluator() {
            return commentEvaluator;
        }

    }

    public class Service {
        @Expose
        public String name;
        @Expose
        public String comment;
        @Expose
        public double total;
        @Expose
        public List<Item> items;
    }

    public class Item {
        @Expose
        public String name;
        @Expose
        public short answer;
    }
}
