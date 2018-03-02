import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

function EndedEvaluator({ data }) {
  const columns = [{
    title: 'Código SAP',
    dataIndex: 'sapCode',
    key: 'sapCode',
  }, {
    title: 'Nombre del proveedor',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'NIT',
    dataIndex: 'nit',
    key: 'nit',
  }, {
    title: 'Tipo de suministro',
    dataIndex: 'supply',
    key: 'supply',
  }, {
    title: 'Categoría',
    dataIndex: 'category',
    key: 'category',
  }, {
    title: 'Tamaño de empresa',
    dataIndex: 'companySize',
    key: 'companySize',
  }, {
    title: 'Calificación proveedor',
    dataIndex: 'totalScoreOfSupplier',
    key: 'totalScoreOfSupplier',
    render(value) {
      return value.toFixed(2);
    },
  }, {
    title: 'Calificación evaluador',
    dataIndex: 'totalScoreOfEvaluator',
    key: 'totalScoreOfEvaluator',
    render(value) {
      return value.toFixed(2);
    },
  }, {
    title: 'Ver encuesta',
    dataIndex: 'link',
    key: 'link',
    render(text, record) {
      return (
        <Link to={`/supplier/${record.idSupplier}/${record.idSupplierByCall}`}>
          Ver
        </Link>
      );
    },
  }];

  return (
    <div>
      <div>
        <strong>Total resultados: </strong>
        {data ? data.length : 0}
      </div>
      <Table
        rowKey={record => record.id}
        dataSource={data}
        columns={columns}
      />
    </div>
  );
}

export default EndedEvaluator;
