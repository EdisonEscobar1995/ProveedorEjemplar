import React from 'react';
import userData from './userData';
import GenericForm from '../shared/GenericForm';

function User(props) {
  return (
    <GenericForm
      {...props}
      formData={userData}
      submitMethod={props.saveUser}
      validate
    />
  );
}
export default User;
