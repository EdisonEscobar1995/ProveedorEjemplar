import React from 'react';
import dimensionData from './dimensionData';
import GenericForm from '../shared/GenericForm';

function Dimension(props) {
  return (
    <GenericForm
      {...props}
      formData={dimensionData}
      submitMethod={props.saveDimension}
      validate
    />
  );
}

export default Dimension;
