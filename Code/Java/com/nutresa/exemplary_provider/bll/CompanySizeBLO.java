package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.CompanySizeDAO;
import com.nutresa.exemplary_provider.dtl.CompanySizeDTO;

public class CompanySizeBLO extends GenericBLO<CompanySizeDTO, CompanySizeDAO>{

	public CompanySizeBLO(){
		super(CompanySizeDAO.class);
	}
	
}
