package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CompanyTypeDAO;
import com.nutresa.exemplary_provider.dtl.CompanyTypeDTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CompanyTypeBLO extends GenericBLO<CompanyTypeDTO, CompanyTypeDAO> {

    public CompanyTypeBLO() {
        super(CompanyTypeDAO.class);
    }

    @Override
    public CompanyTypeDTO save(CompanyTypeDTO companyType) throws HandlerGenericException {
        CompanyTypeDTO response = null;
        if (null != companyType.getName()) {
            if (existCompanyType(companyType)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(companyType);
            }
            return response;
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }
    }

    private boolean existCompanyType(CompanyTypeDTO companyType) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(companyType.getName());

        String idItem = companyType.getId();
        String temporalIdentifier = companyType.getName().trim().toUpperCase();

        CompanyTypeDAO companyTypeDAO = new CompanyTypeDAO();
        List<CompanyTypeDTO> existingCompanyType = companyTypeDAO.getByProperties(filter);

        if (!existingCompanyType.isEmpty()) {
            CompanyTypeDTO existingType = existingCompanyType.get(0);

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
        entityWithFields.put("CompanyType", fields);
        return entityWithFields;
    }

}
