package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.DepartmentDAO;
import com.nutresa.exemplary_provider.dtl.DepartmentDTO;

public class DepartmentBLO extends GenericBLO<DepartmentDTO, DepartmentDAO> {

	public DepartmentBLO() {
		super(DepartmentDAO.class);
	}

}
