package com.nutresa.exemplary_provider.dtl;

public enum SurveySection {
    SUPPLIER("supplier"), EVALUATOR("evaluator");

    private final String nameSection;

    private SurveySection(String nameSection) {
        this.nameSection = nameSection;
    }

    public String getNameSection() {
        return this.nameSection;
    }
}
