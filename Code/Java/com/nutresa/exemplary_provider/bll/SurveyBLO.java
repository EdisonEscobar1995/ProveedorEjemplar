package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SurveyDAO;
import com.nutresa.exemplary_provider.dtl.SurveyDTO;

public class SurveyBLO extends GenericBLO<SurveyDTO, SurveyDAO> {

	public SurveyBLO() {
		super(SurveyDAO.class);
	}

}
