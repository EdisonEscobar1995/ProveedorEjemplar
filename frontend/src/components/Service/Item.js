import React from 'react';
import itemData from './itemData';
import GenericForm from '../shared/GenericForm';

function Item(props) {
  return (
    <GenericForm
      {...props}
      formData={itemData}
      submitMethod={props.saveItem}
      validate
    />
  );
}

export default Item;
