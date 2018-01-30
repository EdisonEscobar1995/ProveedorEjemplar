import React from 'react';
import filtersData from './filtersData';
import FilterForm from '../shared/FilterForm';
import Buttons from './Buttons';

function Filters(props) {
  return (
    <div>
      <FilterForm
        {...props}
        getFields={filtersData}
      />
      <Buttons
        {...props}
      />
    </div>
  );
}
export default Filters;
