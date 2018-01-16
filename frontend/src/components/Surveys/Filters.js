import React from 'react';
import filtersData from './filtersData';
import FilterForm from '../shared/FilterForm';


function Filters(props) {
  return (
    <FilterForm
      {...props}
      getData={props.getSurveys}
      getFields={filtersData}
    />
  );
}
export default Filters;
