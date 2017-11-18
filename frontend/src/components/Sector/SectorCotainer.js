import React from 'react';
import { connect } from 'react-redux';
import Sector from './Sector';

function SectorContainer({ data }) {
  const colummns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  return (
    <Sector colummns={colummns} data={data} />
  );
}


const mapStateToProps = state => (
  {
    loading: state.sector.loading,
    data: state.sector.data,
  }
);

export default connect(
  mapStateToProps,
)(SectorContainer);
