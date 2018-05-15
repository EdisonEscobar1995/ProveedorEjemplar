package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.DimensionDAO;
import com.nutresa.exemplary_provider.dtl.DimensionDTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class DimensionBLO extends GenericBLO<DimensionDTO, DimensionDAO> {

    public DimensionBLO() {
        super(DimensionDAO.class);
    }

    public List<DimensionDTO> getDimensionsBySurvey(String idSurvey) throws HandlerGenericException {
        DimensionDAO dimensionDAO = new DimensionDAO();
        List<DimensionDTO> responseWithDimensions = new ArrayList<DimensionDTO>();
        List<String> questions = null;
        try {
            QuestionBLO questionBLO = new QuestionBLO();
            questions = questionBLO.getDimensionsInQuestionBySurvery(idSurvey);
            for (String idDimension : questions) {
                responseWithDimensions.add(dimensionDAO.get(idDimension));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return responseWithDimensions;
    }

    @Override
    public DimensionDTO save(DimensionDTO dimension) throws HandlerGenericException {
        DimensionDTO response = null;

        if (null != dimension.getName()) {
            if (existDimension(dimension)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(dimension);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private boolean existDimension(DimensionDTO dimension) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(dimension.getName());

        String idItem = dimension.getId();
        String temporalIdentifier = dimension.getName().trim().toUpperCase();

        DimensionDAO dimensionDAO = new DimensionDAO();
        List<DimensionDTO> existingDimensions = dimensionDAO.getByProperties(filter);

        if (!existingDimensions.isEmpty()) {
            DimensionDTO existingDimension = existingDimensions.get(0);

            String idItemExisting = existingDimension.getId();
            String temporalIdentifierExisting = existingDimension.getName().trim().toUpperCase();

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
        entityWithFields.put("Dimension", fields);
        return entityWithFields;
    }
}
