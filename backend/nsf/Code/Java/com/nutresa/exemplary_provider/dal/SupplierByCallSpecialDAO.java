package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.SupplierByCallSpecialDTO;

public class SupplierByCallSpecialDAO extends GenericDAO<SupplierByCallSpecialDTO> {

	public SupplierByCallSpecialDAO() {
        super(SupplierByCallSpecialDTO.class);
        this.entityView = "vwSuppliersByCallSpecial";
    }
}
