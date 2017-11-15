package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.SubCategoryBLO;
import com.nutresa.exemplary_provider.dtl.SubCategoryDTO;

public class SocietyTypeAPI extends GenericAPI<SubCategoryDTO, SubCategoryBLO> {

	public SocietyTypeAPI() {
		super(SubCategoryDTO.class, SubCategoryBLO.class);
	}

}
