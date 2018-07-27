import React from 'react';
import dataForm from './dataForm';
import GenericForm from '../shared/GenericForm';

const Notification = props => (
  <GenericForm
    {...props}
    formData={dataForm}
    submitMethod={props.saveNotification}
    validate
  />
);

export default Notification;
