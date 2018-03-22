import React from 'react';
import sectorData from './sectorData';
import GenericForm from '../shared/GenericForm';

function Sector(props) {
  return (
    <GenericForm
      {...props}
      formData={sectorData}
      submitMethod={props.saveSector}
      validate
    />
  );
}
export default Sector;
