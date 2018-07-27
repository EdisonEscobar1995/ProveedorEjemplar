import React from 'react';
import dataForm from './dataForm';
import GenericForm from '../shared/GenericForm';

const Dictionary = props => (
  <GenericForm
    {...props}
    formData={dataForm}
    submitMethod={props.saveDictionary}
    validate
  />
);

export default Dictionary;
