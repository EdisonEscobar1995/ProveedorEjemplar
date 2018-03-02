import React from 'react';
import { Table, Checkbox, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import message from '../../components/shared/message';

function EndedEvaluator({ data, checkSupplier, sendApprovals, sendRejections }) {
  const onChange = (event, record) => {
    checkSupplier(record.idSupplier, event.target.checked);
  };

  const validateChecked = (sendMethod) => {
    const checked = data.filter(item => item.checked).map(item => item.idSupplierByCall);
    if (checked.length > 0) {
      sendMethod(checked);
    } else {
      message({ text: 'Debe seleccionar al menos un proveedor', type: 'error' });
    }
  };

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
  }, {
    title: 'Seleccionar',
    dataIndex: 'check',
    key: 'check',
    render(text, record) {
      return (
        <Checkbox onChange={event => (onChange(event, record))} />
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
      <Row justify="center" align="middle" type="flex" gutter={24}>
        <Col>
          <Button
            type="primary"
            onClick={() => validateChecked(sendApprovals)}
          >
            Pasan a evaluación de comité ténico
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => validateChecked(sendRejections)}
          >
            No pasan a evaluación de comité ténico
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default EndedEvaluator;
