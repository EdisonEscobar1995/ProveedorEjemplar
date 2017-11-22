import React from 'react';
import GenericForm from '../shared/GenericForm';

function Sector({ loading, colummns, data, actual, saveData, deleteData }) {
  return (
    <GenericForm
      loading={loading}
      data={data}
      actual={actual}
      colummns={colummns}
      saveData={saveData}
      deleteData={deleteData}
    />
  );
}
export default Sector;
