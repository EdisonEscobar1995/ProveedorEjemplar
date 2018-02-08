import React from 'react';
import fieldsData from './fieldsData';
import FilterForm from '../shared/FilterForm';

function Filters(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.filterCalledSuppliers(props.form.getFieldsValue());
  };

  return (
    <FilterForm
      {...props}
      fieldsData={fieldsData}
      handleSubmit={handleSubmit}
    />
  );
}

export default Filters;
