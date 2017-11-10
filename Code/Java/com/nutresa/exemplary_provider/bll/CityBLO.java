package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.CityDAO;
import com.nutresa.exemplary_provider.dtl.CityDTO;

public class CityBLO extends GenericBLO<CityDTO, CityDAO>{

	public CityBLO(){
		super(CityDAO.class);
	}
	
}
