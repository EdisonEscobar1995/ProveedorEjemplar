package com.nutresa.exemplary_provider.bll;


import com.nutresa.exemplary_provider.dal.SupplierByCallSpecialDAO;
import com.nutresa.exemplary_provider.dtl.SectionRule;
import com.nutresa.exemplary_provider.dtl.SupplierByCallSpecialDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierByCallSpecialBLO extends GenericBLO<SupplierByCallSpecialDTO, SupplierByCallSpecialDAO> {

    private SectionRule rules;

    public SupplierByCallSpecialBLO() {
        super(SupplierByCallSpecialDAO.class);
        rules = new SectionRule();
    }

    public SectionRule getRule() {
        return rules;
    }
    
    public boolean changeState(String nameState, String idSupplierByCall) {
        StateBLO stateBLO = new StateBLO();
        boolean response = true;
        SupplierByCallSpecialDAO supplierByCallDAO = new SupplierByCallSpecialDAO();
        try {
            SupplierByCallSpecialDTO supplierByCallSpecial = supplierByCallDAO.get(idSupplierByCall);
            supplierByCallSpecial.setIdState(stateBLO.getStateByShortName(nameState).getId());
            super.save(supplierByCallSpecial);
        } catch (HandlerGenericException exception) {
            response = false;
            Common.logError("Error saving to log ", exception);
        }

        return response;
    }

    @Override
    public SupplierByCallSpecialDTO save(SupplierByCallSpecialDTO dto) throws HandlerGenericException {
    	return super.save(dto);
    }
    
}
