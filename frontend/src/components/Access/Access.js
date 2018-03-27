import React from 'react';
import accessData from './accessData';
import GenericForm from '../shared/GenericForm';

function Access(props) {
  return (
    <GenericForm
      {...props}
      formData={accessData}
      submitMethod={props.saveAccess}
      validate
    />
  );
}
export default Access;
