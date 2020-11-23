import React from 'react';
import criterionDataPercent from './criterionDataPercent';
import GenericForm from '../shared/GenericForm';

function Criterion(props) {
  return (
    <GenericForm
      {...props}
      formData={criterionDataPercent}
      submitMethod={props.savePercentDimensionCriterion}
      validate
    />
  );
}

export default Criterion;
