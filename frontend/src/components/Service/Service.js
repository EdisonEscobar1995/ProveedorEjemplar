import React from 'react';
import serviceData from './serviceData';
import GenericForm from '../shared/GenericForm';

function Service(props) {
  return (
    <GenericForm
      {...props}
      formData={serviceData}
      submitMethod={props.saveService}
      validate
    />
  );
}

export default Service;
