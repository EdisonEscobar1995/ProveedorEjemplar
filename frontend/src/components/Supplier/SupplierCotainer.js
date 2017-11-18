import React from 'react';
import { connect } from 'react-redux';
import Supplier from './Supplier';

function SupplierContainer({ data }) {
  console.log(data);
  const colummns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  return (
    <Supplier colummns={colummns} data={data} />
  );
}


const mapStateToProps = state => (
  {
    loading: state.supplier.loading,
    data: state.supplier.data,
  }
);

export default connect(
  mapStateToProps,
)(SupplierContainer);
