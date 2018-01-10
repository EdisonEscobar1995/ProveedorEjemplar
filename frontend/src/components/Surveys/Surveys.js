import React from 'react';
import { Table } from 'antd';

function Surveys({ data, loading }) {
  const { suppliers, suppliersByCall, masters } = data;

  const columns = [{
    title: 'Año',
    dataIndex: 'year',
    key: 'year',
  }, {
    title: 'Nombre del proveedor',
    dataIndex: 'businessName',
    key: 'businessName',
  }, {
    title: 'Código SAP',
    dataIndex: 'sapCode',
    key: 'sapCode',
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
      return masters.Category.find(category => category.id === record.idCategory).name;
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
    dataIndex: 'surveyState',
    key: 'surveyState',
    render(text, record) {
      return suppliersByCall
        .find(item => item.idSupplier === record.id)
        .state;
    },
  }];

  return (
    <div>
      <Table
        rowKey={record => record.id}
        loading={loading}
        dataSource={suppliers ? suppliers.filter(item => item.visible) : []}
        columns={columns}
      />
    </div>
  );
}

export default Surveys;
