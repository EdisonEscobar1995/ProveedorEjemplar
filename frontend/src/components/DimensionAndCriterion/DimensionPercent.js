import React from 'react';
import dimensionDataPercent from './dimensionDataPercent';
import GenericForm from '../shared/GenericForm';

function DimensionPercent(props) {
  return (
    <GenericForm
      {...props}
      formData={dimensionDataPercent}
      submitMethod={props.savePercentDimensionCriterion}
      validate
    />
  );
}

export default DimensionPercent;
