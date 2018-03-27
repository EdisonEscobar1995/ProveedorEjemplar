import React from 'react';
import accessByRolData from './accessByRolData';
import GenericForm from '../shared/GenericForm';

function AccessByRol(props) {
  return (
    <GenericForm
      {...props}
      formData={accessByRolData}
      submitMethod={props.saveAccessByRol}
      validate
    />
  );
}
export default AccessByRol;
