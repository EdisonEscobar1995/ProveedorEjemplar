package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.QuestionDAO;
import com.nutresa.exemplary_provider.dtl.QuestionDTO;

public class QuestionBLO extends GenericBLO<QuestionDTO, QuestionDAO> {

	public QuestionBLO() {
		super(QuestionDAO.class);
	}

}