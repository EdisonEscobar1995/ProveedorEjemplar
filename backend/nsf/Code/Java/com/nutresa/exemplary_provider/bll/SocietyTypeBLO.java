package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.SocietyTypeDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.SocietyTypeDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SocietyTypeBLO extends GenericBLO<SocietyTypeDTO, SocietyTypeDAO> {

    public SocietyTypeBLO() {
        super(SocietyTypeDAO.class);
    }

    @Override
    public SocietyTypeDTO save(SocietyTypeDTO societyType) throws HandlerGenericException {
        SocietyTypeDTO response = null;

        if (null != societyType.getName()) {
            if (existSocietyType(societyType)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(societyType);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private boolean existSocietyType(SocietyTypeDTO societyType) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(societyType.getName());

        String idItem = societyType.getId();
        String temporalIdentifier = societyType.getName().trim().toUpperCase();

        SocietyTypeDAO societyTypeDAO = new SocietyTypeDAO();
        List<SocietyTypeDTO> existingSocietyTypes = societyTypeDAO.getByProperties(filter);

        if (!existingSocietyTypes.isEmpty()) {
            SocietyTypeDTO existingSocietyType = existingSocietyTypes.get(0);

            String idItemExisting = existingSocietyType.getId();
            String temporalIdentifierExisting = existingSocietyType.getName().trim().toUpperCase();

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

}