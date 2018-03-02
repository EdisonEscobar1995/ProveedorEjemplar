import React from 'react';
import evaluationScaleData from './evaluationScaleData';
import GenericForm from '../shared/GenericForm';

function EvaluationScale(props) {
  return (
    <GenericForm
      {...props}
      formData={evaluationScaleData}
      submitMethod={props.saveEvaluationScale}
      validate
    />
  );
}
export default EvaluationScale;
