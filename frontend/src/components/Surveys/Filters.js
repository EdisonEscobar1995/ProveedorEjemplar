import React from 'react';
import fieldsData from './fieldsData';
import FilterForm from '../shared/FilterForm';

function Filters(props) {
  const handleReset = () => {
    props.form.resetFields();
    props.getSurveys();
  };

  return (
    <FilterForm
      {...props}
      fieldsData={fieldsData}
      handleReset={handleReset}
    />
  );
}

export default Filters;
