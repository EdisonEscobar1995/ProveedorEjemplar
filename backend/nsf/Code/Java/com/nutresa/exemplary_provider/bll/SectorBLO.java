package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.SectorDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.SectorDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SectorBLO extends GenericBLO<SectorDTO, SectorDAO> {

    public SectorBLO() {
        super(SectorDAO.class);
    }

    @Override
    public SectorDTO save(SectorDTO sector) throws HandlerGenericException {
        SectorDTO response = null;

        if (null != sector.getName()) {
            if (existSector(sector)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(sector);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private boolean existSector(SectorDTO sector) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(sector.getName());

        String idItem = sector.getId();
        String temporalIdentifier = sector.getName().trim().toUpperCase();

        SectorDAO sectorDAO = new SectorDAO();
        List<SectorDTO> existingSectors = sectorDAO.getByProperties(filter);

        if (!existingSectors.isEmpty()) {
            SectorDTO existingSector = existingSectors.get(0);

            String idItemExisting = existingSector.getId();
            String temporalIdentifierExisting = existingSector.getName().trim().toUpperCase();

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
