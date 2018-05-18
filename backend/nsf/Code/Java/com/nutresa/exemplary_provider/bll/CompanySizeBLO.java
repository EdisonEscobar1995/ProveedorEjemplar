package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CompanySizeDAO;
import com.nutresa.exemplary_provider.dtl.CompanySizeDTO;

public class CompanySizeBLO extends GenericBLO<CompanySizeDTO, CompanySizeDAO> {

    public CompanySizeBLO() {
        super(CompanySizeDAO.class);
    }

    protected static Map<String, List<String>> getEntityWithFieldsToTranslate() {
        Map<String, List<String>> entityWithFields = new HashMap<String, List<String>>();
        List<String> fields = new ArrayList<String>();
        fields.add("name");
        entityWithFields.put("CompanySize", fields);
        return entityWithFields;
    }

}
