import React from 'react';
import criterionData from './criterionData';
import GenericForm from '../shared/GenericForm';

function Criterion(props) {
  return (
    <GenericForm
      {...props}
      formData={criterionData}
      submitMethod={props.saveCriterion}
      validate
    />
  );
}

export default Criterion;
