import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

function CallReport({ data, participateInCall }) {
  const { suppliers, suppliersByCall, masters } = data;

  const columns = [{
    title: 'NIT',
    dataIndex: 'nit',
    key: 'nit',
  }, {
    title: 'Código SAP',
    dataIndex: 'sapCode',
    key: 'sapCode',
  }, {
    title: 'Nombre del proveedor',
    dataIndex: 'businessName',
    key: 'businessName',
  }, {
    title: 'Tipo de suministro',
    dataIndex: 'idSupply',
    key: 'idSupply',
    render(text, record) {
      return masters.Supply.find(supply => supply.id === record.idSupply).name;
    },
  }, {
    title: 'Tamaño de empresa',
    dataIndex: 'idCompanySize',
    key: 'idCompanySize',
    render(text, record) {
      const companySize = masters.CompanySize.find(item => item.id === record.idCompanySize);
      return companySize ? companySize.name : '';
    },
  }, {
    title: 'Participó',
    dataIndex: 'participated',
    key: 'participated',
    render(text, record) {
      return participateInCall(suppliersByCall
        .find(item => item.idSupplier === record.id)
        .participateInCall);
    },
  }, {
    title: 'Enlace',
    dataIndex: 'link',
    key: 'link',
    render(text, record) {
      const idSupplierByCall = suppliersByCall
        .find(item => item.idSupplier === record.id)
        .id;
      return (
        <Link to={`/supplier/${record.id}/${idSupplierByCall}`}>
          Ver
        </Link>
      );
    },
  }];

  return (
    <div>
      <div>
        <strong>Total resultados: </strong>
        {suppliers ? suppliers.filter(item => item.visible).length : 0}
      </div>
      <Table
        rowKey={record => record.id}
        dataSource={suppliers ? suppliers.filter(item => item.visible) : []}
        columns={columns}
      />
    </div>
  );
}

export default CallReport;
