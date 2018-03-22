import React from 'react';
import subcategoryData from './subcategoryData';
import GenericForm from '../shared/GenericForm';

function Subcategory(props) {
  return (
    <GenericForm
      {...props}
      formData={subcategoryData}
      submitMethod={props.saveSubcategory}
      validate
    />
  );
}

export default Subcategory;
