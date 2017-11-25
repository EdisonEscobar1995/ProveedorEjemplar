import React from 'react';
import { Table } from 'antd';

function ModifiedSuppliers(props) {
  const { data, loading } = props;
  const { suppliers, categories } = data;

  const columns = [{
    title: 'Nombre del proveedor',
    dataIndex: 'businessName',
    key: 'businessName',
  }, {
    title: 'NIT',
    dataIndex: 'nit',
    key: 'nit',
  }, {
    title: 'Código SAP',
    dataIndex: 'sapCode',
    key: 'sapCode',
  }, {
    title: 'Tipo de suministro',
    dataIndex: 'idSupply',
    key: 'idSupply',
    render(text, record) {
      return record.idSupply;
    },
  }, {
    title: 'Categoría',
    dataIndex: 'idCategory',
    key: 'idCategory',
    render(text, record) {
      const filter = categories.filter(category => category.id === record.idCategory);
      return filter[0].name;
    },
  }, {
    title: 'Tamaño de empresa asignado',
    dataIndex: 'idCompanySize',
    key: 'idCompanySize',
    render(text, record) {
      return record.idCompanySize;
    },
  }, {
    title: 'Tamaño de empresa actual',
    dataIndex: 'idCompanySize',
    key: 'idCompanySize',
    render(text, record) {
      return record.idCompanySize;
    },
  }, {
    title: 'Estado',
    dataIndex: 'state',
    key: 'state',
    render(text, record) {
      return record.state;
    },
  }];

  return (
    <div>
      <Table
        rowKey={record => record.id}
        loading={loading}
        dataSource={suppliers}
        columns={columns}
      />
    </div>
  );
}

export default ModifiedSuppliers;
