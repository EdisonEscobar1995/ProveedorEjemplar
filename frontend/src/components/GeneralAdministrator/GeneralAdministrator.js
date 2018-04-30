import React from 'react';
import dataForm from './dataForm';
import GenericForm from '../shared/GenericForm';

function GeneralAdministrator(props) {
  return (
    <GenericForm
      {...props}
      formData={dataForm}
      submitMethod={props.saveGeneralAdministrator}
      validate
    />
  );
}

export default GeneralAdministrator;
