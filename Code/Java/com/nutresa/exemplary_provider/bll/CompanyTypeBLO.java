package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.CompanyTypeDAO;
import com.nutresa.exemplary_provider.dtl.CompanyTypeDTO;

public class CompanyTypeBLO extends GenericBLO<CompanyTypeDTO, CompanyTypeDAO>{

	public CompanyTypeBLO(){
		super(CompanyTypeDAO.class);
	}
	
}
