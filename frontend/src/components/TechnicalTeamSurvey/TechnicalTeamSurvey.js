import React from 'react';
import { Table } from 'antd';

const { Column } = Table;

function Surveys({ data }) {
  const { suppliers, suppliersByCall, masters, states } = data;

  const columns = [{
    title: 'Estado',
    key: 'surveyState',
    render(text, record) {
      const idState = suppliersByCall
        .find(item => item.idSupplier === record.id)
        .idState;
      return states.find(item => item.id === idState).name;
    },
  }, {
    title: 'Evaluado por',
    key: 'negotiator',
    render(text, record) {
      return suppliersByCall
        .find(item => item.idSupplier === record.id)
        .whoEvaluateOfTechnicalTeam;
    },
  }, {
    title: 'Nombre del proveedor',
    key: 'businessName',
  }, {
    title: 'Tipo de suministro',
    key: 'idSupply',
    render(text, record) {
      return masters.Supply.find(supply => supply.id === record.idSupply).name;
    },
  }, {
    title: 'Categoría',
    key: 'idCategory',
    render(text, record) {
      const category = masters.Category.find(item => item.id === record.idCategory);
      return category ? category.name : '';
    },
  }, {
    title: 'Tamaño de empresa',
    key: 'idCompanySize',
    render(text, record) {
      const companySize = masters.CompanySize.find(item => item.id === record.idCompanySize);
      return companySize ? companySize.name : '';
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
      >
        {
          columns.map(column => (
            (
              <Column
                title={column.title}
                key={column.key}
                dataIndex={column.key}
                render={column.render}
              />
            )
          ))
        }
      </Table>
    </div>
  );
}

export default Surveys;
