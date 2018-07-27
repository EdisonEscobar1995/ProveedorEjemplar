package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CityDAO;
import com.nutresa.exemplary_provider.dtl.CityDTO;

public class CityBLO extends GenericBLO<CityDTO, CityDAO> {

    public CityBLO() {
        super(CityDAO.class);
    }

    protected static Map<String, List<String>> getEntityWithFieldsToTranslate() {
        Map<String, List<String>> entityWithFields = new HashMap<String, List<String>>();
        List<String> fields = new ArrayList<String>();
        fields.add("name");
        entityWithFields.put("City", fields);
        return entityWithFields;
    }

}
