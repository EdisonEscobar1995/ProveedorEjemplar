package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.DimensionDAO;
import com.nutresa.exemplary_provider.dtl.DimensionDTO;

public class DimensionBLO extends GenericBLO<DimensionDTO, DimensionDAO> {

	public DimensionBLO() {
		super(DimensionDAO.class);
	}

}
