package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.CityDTO;

public class CityDAO extends GenericDAO<CityDTO> {

	public CityDAO(){
		super(CityDTO.class);
		this.entityView = "vwCities";
	}
	
}
