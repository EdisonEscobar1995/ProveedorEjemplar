package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CriterionDAO;
import com.nutresa.exemplary_provider.dtl.CriterionDTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CriterionBLO extends GenericBLO<CriterionDTO, CriterionDAO> {

    public CriterionBLO() {
        super(CriterionDAO.class);
    }

    public List<CriterionDTO> getCriterionsBySurvey(String idSurvey, String idDimension) throws HandlerGenericException {
        CriterionDAO dimensionDAO = new CriterionDAO();
        List<CriterionDTO> responseWithCriterions = new ArrayList<CriterionDTO>();
        List<String> questions = null;
        try {
            QuestionBLO questionBLO = new QuestionBLO();
            questions = questionBLO.getCriterionsInQuestionBySurvery(idSurvey, idDimension);
            for (String idCriterions : questions) {
                responseWithCriterions.add(dimensionDAO.get(idCriterions));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return responseWithCriterions;
    }

    @Override
    public CriterionDTO save(CriterionDTO criterion) throws HandlerGenericException {
        CriterionDTO response = null;

        if (null != criterion.getName() && null != criterion.getIdDimension()) {
            if (existCriterion(criterion)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(criterion);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private boolean existCriterion(CriterionDTO criterion) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(criterion.getIdDimension());
        filter.add(criterion.getName());

        String idItem = criterion.getId();
        String temporalIdentifier = criterion.getName().trim().toUpperCase().concat(criterion.getIdDimension());

        CriterionDAO criterionDAO = new CriterionDAO();
        List<CriterionDTO> existingCriterions = criterionDAO.getByProperties(filter);

        if (!existingCriterions.isEmpty()) {
            CriterionDTO existingCriterion = existingCriterions.get(0);

            String idItemExisting = existingCriterion.getId();
            String temporalIdentifierExisting = existingCriterion.getName().trim().toUpperCase().concat(
                    criterion.getIdDimension());

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
        entityWithFields.put("Criterion", fields);
        return entityWithFields;
    }

}
