import React from 'react';
import categoryData from './categoryData';
import GenericForm from '../shared/GenericForm';

function Category(props) {
  return (
    <GenericForm
      {...props}
      formData={categoryData}
      submitMethod={props.saveCategory}
      validate
    />
  );
}

export default Category;
