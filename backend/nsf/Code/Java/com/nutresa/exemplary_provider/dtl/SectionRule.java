package com.nutresa.exemplary_provider.dtl;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.annotations.Expose;

public class SectionRule {
    @Expose
    private Map<String, Map<String, Object>> rules;

    public SectionRule() {
        Map<String, Map<String, Object>> specificRule = new HashMap<String, Map<String, Object>>();
        Map<String, Object> rule = new HashMap<String, Object>();
        rule.put("show", false);
        rule.put("readOnly", true);
        specificRule.put(SurveySection.SUPPLIER.getNameSection(), rule);
        specificRule.put(SurveySection.EVALUATOR.getNameSection(), rule);
        specificRule.put(SurveySection.LIBERATOR.getNameSection(), rule);
        setRules(specificRule);
    }

    public Map<String, Map<String, Object>> getRules() {
        return rules;
    }

    public void setRules(Map<String, Map<String, Object>> rules) {
        this.rules = rules;
    }

    /**
     * @param section Sección para la que aplican las reglas
     * @param rules Reglas para la sección
     */
    public void setRulesToSection(String section, Map<String, Object> rules) {
        this.getRules().put(section, rules);
    }

    /**
     * @param show Propiedad para determinar si se muestra la sección
     * @param readOnly Propiedad para deterinar si la sección es modo lectura o no
     * @return Colección de reglas.
     */
    public Map<String, Object> buildRules(boolean show, boolean readOnly) {
        Map<String, Object> specifRules = new HashMap<String, Object>();
        specifRules.put("show", show);
        specifRules.put("readOnly", readOnly);
        return specifRules;
    }
}
