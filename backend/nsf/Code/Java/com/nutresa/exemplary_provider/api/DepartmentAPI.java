package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.DepartmentBLO;
import com.nutresa.exemplary_provider.dtl.DepartmentDTO;

public class DepartmentAPI extends GenericAPI<DepartmentDTO, DepartmentBLO> {

    public DepartmentAPI() {
        super(DepartmentDTO.class, DepartmentBLO.class);
    }

}
