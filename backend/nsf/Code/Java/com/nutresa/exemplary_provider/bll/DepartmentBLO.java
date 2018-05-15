package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.DepartmentDAO;
import com.nutresa.exemplary_provider.dtl.DepartmentDTO;

public class DepartmentBLO extends GenericBLO<DepartmentDTO, DepartmentDAO> {

    public DepartmentBLO() {
        super(DepartmentDAO.class);
    }

    protected static Map<String, List<String>> getEntityWithFieldsToTranslate() {
        Map<String, List<String>> entityWithFields = new HashMap<String, List<String>>();
        List<String> fields = new ArrayList<String>();
        fields.add("name");
        entityWithFields.put("Department", fields);
        return entityWithFields;
    }

}
