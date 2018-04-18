import React from 'react';
import { Table, Checkbox, Button, Row, Col, notification } from 'antd';
import { Link } from 'react-router-dom';
import message from '../../components/shared/message';
import Confirm from '../shared/Confirm';
import { MANAGER_TEAM } from '../../utils/const';

function SupplierSelection(props) {
  const { data, checkSupplier, sendApprovals, sendRejections } = props;
  const onChange = (event, record) => {
    checkSupplier(record.idSupplier, event.target.checked);
  };

  const openNotification = (list) => {
    const plural = list.length > 1 ? 's' : '';
    notification.success({
      message: 'Operación exitosa',
      description: `${list.length} documento${plural} procesado${plural}`,
    });
  };

  const validateChecked = (sendMethod) => {
    const checked = data.filter(item => item.checked).map(item => item.idSupplierByCall);
    if (checked.length > 0) {
      sendMethod(checked, props.type, openNotification);
    } else {
      message({ text: 'Debe seleccionar al menos un proveedor', type: 'info' });
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

  if (props.type === MANAGER_TEAM) {
    columns.splice(8, 0, {
      title: 'Calificación comité técnico',
      dataIndex: 'totalScoreInService',
      key: 'totalScoreInService',
      render(value) {
        return value.toFixed(2);
      },
    });
  }

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
                  {props.approvalText}
                </Button>
              </Confirm>
            </Col>
            <Col>
              <Confirm method={() => validateChecked(sendRejections)}>
                <Button type="primary">
                  {props.rejectionText}
                </Button>
              </Confirm>
            </Col>
          </Row>
        ) : null
      }
    </div>
  );
}

export default SupplierSelection;
