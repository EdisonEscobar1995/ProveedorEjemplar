package com.nutresa.exemplary_provider.dtl;

import java.util.Map;

import com.google.gson.annotations.Expose;

public class Rule {
    @Expose
    private Map<String, Map<String, Object>> rules;

    public Map<String, Map<String, Object>> getRules() {
        return rules;
    }

    public void setRules(Map<String, Map<String, Object>> rules) {
        this.rules = rules;
    }
}
