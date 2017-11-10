package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SocietyTypeDAO;
import com.nutresa.exemplary_provider.dtl.SocietyTypeDTO;

public class SocietyTypeBLO extends GenericBLO<SocietyTypeDTO, SocietyTypeDAO> {

	public SocietyTypeBLO() {
		super(SocietyTypeDAO.class);
	}

}