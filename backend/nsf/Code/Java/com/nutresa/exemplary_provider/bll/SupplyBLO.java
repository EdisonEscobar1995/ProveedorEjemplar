package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SupplyDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.SupplyDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplyBLO extends GenericBLO<SupplyDTO, SupplyDAO> {
    public SupplyBLO() {
        super(SupplyDAO.class);
    }

    @Override
    public SupplyDTO save(SupplyDTO supply) throws HandlerGenericException {
        SupplyDTO response = null;

        if (null != supply.getName()) {
            if (existSupply(supply)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(supply);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private boolean existSupply(SupplyDTO supply) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(supply.getName());

        String idItem = supply.getId();
        String temporalIdentifier = supply.getName().trim().toUpperCase();

        SupplyDAO supplyDAO = new SupplyDAO();
        List<SupplyDTO> existingSupplies = supplyDAO.getByProperties(filter);

        if (!existingSupplies.isEmpty()) {
            SupplyDTO existingSupply = existingSupplies.get(0);

            String idItemExisting = existingSupply.getId();
            String temporalIdentifierExisting = existingSupply.getName().trim().toUpperCase();

            if ((null == idItem || idItem.isEmpty()) && (null != temporalIdentifierExisting
                    && temporalIdentifier.equalsIgnoreCase(temporalIdentifierExisting))) {
                existItem = true;
            } else {
                if (null != idItem && null != idItemExisting && !idItem.equals(idItemExisting)
                        && temporalIdentifier.equalsIgnoreCase(temporalIdentifierExisting)) {
                    existItem = true;
                }
            }
        }

        return existItem;
    }

    protected static Map<String, List<String>> getEntityWithFieldsToTranslate() {
        Map<String, List<String>> entityWithFields = new HashMap<String, List<String>>();
        List<String> fields = new ArrayList<String>();
        fields.add("name");
        entityWithFields.put("Supply", fields);
        return entityWithFields;
    }

}
