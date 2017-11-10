package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SupplierDAO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;

public class SupplierBLO extends GenericBLO<SupplierDTO, SupplierDAO> {

	public SupplierBLO() {
		super(SupplierDAO.class);
	}

}