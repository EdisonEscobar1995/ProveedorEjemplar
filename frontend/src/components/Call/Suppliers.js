import React from 'react';
import { Table, Button } from 'antd';

function Suppliers({ data, suppliers, loadingSuppliers }) {
  const { masters, suppliersByCall } = data;
  const columns = [{
    title: 'Código SAP',
    dataIndex: 'sapCode',
    key: 'sapCode',
  }, {
    title: 'NIT',
    dataIndex: 'nit',
    key: 'nit',
  }, {
    title: 'Proveedor',
    dataIndex: 'businessName',
    key: 'businessName',
  }, {
    title: 'Correo electrónico',
    dataIndex: 'emails',
    key: 'emails',
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
      return masters.CompanySize.find(companySize => companySize.id === record.idCompanySize).name;
    },
  }, {
    title: 'Estado',
    dataIndex: 'state',
    key: 'state',
    render(text, record) {
      return suppliersByCall.find(supplierByCall => supplierByCall.idSupplier === record.id).state;
    },
  }, {
    title: 'Acción',
    dataIndex: 'action',
    key: 'action',
    render() {
      return (
        <Button
          shape="circle"
          icon="mail"
        />
      );
    },
  }];

  return (
    <div>
      <Table
        rowKey={record => record.id}
        loading={loadingSuppliers}
        dataSource={suppliers}
        columns={columns}
      />
    </div>
  );
}

export default Suppliers;
