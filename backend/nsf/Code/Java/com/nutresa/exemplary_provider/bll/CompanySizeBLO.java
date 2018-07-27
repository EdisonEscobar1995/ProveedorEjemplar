package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CompanySizeDAO;
import com.nutresa.exemplary_provider.dtl.CompanySizeDTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CompanySizeBLO extends GenericBLO<CompanySizeDTO, CompanySizeDAO> {

    public CompanySizeBLO() {
        super(CompanySizeDAO.class);
    }
    
    @Override
    public CompanySizeDTO save(CompanySizeDTO companySize) throws HandlerGenericException {
        CompanySizeDTO response = null;
        if (null != companySize.getName()) {
            if (existCompanySize(companySize)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(companySize);
            }
            return response;
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }
    }

    private boolean existCompanySize(CompanySizeDTO companySize) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(companySize.getName());

        String idItem = companySize.getId();
        String temporalIdentifier = companySize.getName().trim().toUpperCase();

        CompanySizeDAO companySizeDAO = new CompanySizeDAO();
        List<CompanySizeDTO> existingCompanySize = companySizeDAO.getByProperties(filter);

        if (!existingCompanySize.isEmpty()) {
            CompanySizeDTO existingType = existingCompanySize.get(0);

            String idItemExisting = existingType.getId();
            String temporalIdentifierExisting = existingType.getName().trim().toUpperCase();

            if ((null == idItem || idItem.isEmpty())
                    && (null != temporalIdentifierExisting && temporalIdentifier
                            .equalsIgnoreCase(temporalIdentifierExisting))) {
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
        entityWithFields.put("CompanySize", fields);
        return entityWithFields;
    }

}
