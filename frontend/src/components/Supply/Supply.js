import React from 'react';
import supplyData from './supplyData';
import GenericForm from '../shared/GenericForm';

function Supply(props) {
  return (
    <GenericForm
      {...props}
      formData={supplyData}
      submitMethod={props.saveSupply}
      validate
    />
  );
}

export default Supply;
