import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

function Pendings({ data }) {
  const { suppliers, suppliersByCall, masters, states } = data;

  const columns = [{
    title: 'Nombre del proveedor',
    dataIndex: 'businessName',
    key: 'businessName',
    sorter: (a, b) => (a.businessName < b.businessName ? -1 : 1),
  }, {
    title: 'Código SAP',
    dataIndex: 'sapCode',
    key: 'sapCode',
    sorter: (a, b) => (a.sapCode < b.sapCode ? -1 : 1),
  }, {
    title: 'NIT',
    dataIndex: 'nit',
    key: 'nit',
  }, {
    title: 'Tipo de suministro',
    dataIndex: 'idSupply',
    key: 'idSupply',
    render(text, record) {
      return masters.Supply.find(supply => supply.id === record.idSupply).name;
    },
  }, {
    title: 'Categoría',
    dataIndex: 'idCategory',
    key: 'idCategory',
    render(text, record) {
      const category = masters.Category.find(item => item.id === record.idCategory);
      return category ? category.name : '';
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
    title: 'Estado',
    dataIndex: 'idState',
    key: 'idState',
    render(text, record) {
      const idState = suppliersByCall
        .find(item => item.idSupplier === record.id)
        .idState;
      return states.find(item => item.id === idState).name;
    },
  }, {
    title: 'Proveedor',
    dataIndex: 'linkSupplier',
    key: 'linkSupplier',
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

export default Pendings;
