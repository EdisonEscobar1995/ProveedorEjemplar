package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.EvaluationScaleDAO;
import com.nutresa.exemplary_provider.dtl.EvaluationScaleDTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class EvaluationScaleBLO extends GenericBLO<EvaluationScaleDTO, EvaluationScaleDAO> {

    public EvaluationScaleBLO() {
        super(EvaluationScaleDAO.class);
    }

    @Override
    public EvaluationScaleDTO save(EvaluationScaleDTO evaluationScale) throws HandlerGenericException {
        EvaluationScaleDTO response = null;

        if (null != evaluationScale.getName() && !evaluationScale.getName().trim().isEmpty()
                && null != evaluationScale.getApplyTo() && !evaluationScale.getApplyTo().trim().isEmpty()
                && evaluationScale.getScore() > 0 && null != evaluationScale.getHelpText()
                && !evaluationScale.getHelpText().trim().isEmpty()) {
            if (existEvaluationScale(evaluationScale)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else {
                response = super.save(evaluationScale);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }

    private boolean existEvaluationScale(EvaluationScaleDTO evaluationScale) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(evaluationScale.getName());
        filter.add(evaluationScale.getApplyTo());
        filter.add(String.valueOf(evaluationScale.getScore()));

        String idItem = evaluationScale.getId();
        String temporalIdentifier = evaluationScale.getName().concat(
                evaluationScale.getApplyTo().concat(String.valueOf(evaluationScale.getScore())));

        EvaluationScaleDAO evaluationScaleDAO = new EvaluationScaleDAO();
        List<EvaluationScaleDTO> evaluationScalesExisting = evaluationScaleDAO.getByProperties(filter);

        if (!evaluationScalesExisting.isEmpty()) {
            EvaluationScaleDTO evaluationScaleExisting = evaluationScalesExisting.get(0);

            String idItemExisting = evaluationScaleExisting.getId();
            String temporalIdentifierExisting = evaluationScaleExisting.getName().concat(
                    evaluationScaleExisting.getApplyTo().concat(String.valueOf(evaluationScaleExisting.getScore())));

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
}
