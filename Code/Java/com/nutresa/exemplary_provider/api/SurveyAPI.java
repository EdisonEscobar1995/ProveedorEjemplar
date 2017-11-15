package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SurveyBLO;
import com.nutresa.exemplary_provider.dtl.SurveyDTO;

public class SurveyAPI extends GenericAPI<SurveyDTO, SurveyBLO> {

	public SurveyAPI() {
		super(SurveyDTO.class, SurveyBLO.class);
	}

}