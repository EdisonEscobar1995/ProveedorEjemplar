import React from 'react';
import { Table, Checkbox, Button, Row, Col, notification } from 'antd';
import { Link } from 'react-router-dom';
import message from '../../components/shared/message';
import Confirm from '../shared/Confirm';

function EndedEvaluator({ data, checkSupplier, sendApprovals, sendRejections }) {
  const onChange = (event, record) => {
    checkSupplier(record.idSupplier, event.target.checked);
  };

  const openNotification = (list) => {
    const plural = list.length > 1 ? 's' : '';
    notification.open({
      message: 'Operación exitosa',
      description: `${list.length} documento${plural} procesado${plural}`,
    });
  };

  const validateChecked = (sendMethod) => {
    const checked = data.filter(item => item.checked).map(item => item.idSupplierByCall);
    if (checked.length > 0) {
      sendMethod(checked, openNotification);
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
        <Checkbox checked={record.checked} onChange={event => (onChange(event, record))} />
      );
    },
  }];

  return (
    <div>
      <div>
        <strong>Total resultados: </strong>
        {data.length}
      </div>
      <Table
        rowKey={record => record.id}
        dataSource={data}
        columns={columns}
      />
      {
        data.length > 0 ? (
          <Row justify="center" align="middle" type="flex" gutter={24}>
            <Col>
              <Confirm method={() => validateChecked(sendApprovals)}>
                <Button type="primary">
                  Pasan a evaluación de comité ténico
                </Button>
              </Confirm>
            </Col>
            <Col>
              <Confirm method={() => validateChecked(sendRejections)}>
                <Button type="primary">
                  No pasan a evaluación de comité ténico
                </Button>
              </Confirm>
            </Col>
          </Row>
        ) : null
      }
    </div>
  );
}

export default EndedEvaluator;
