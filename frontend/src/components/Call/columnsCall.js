import React, { Fragment } from 'react';
import { Tooltip, Button } from 'antd';

const columnsCall = (onAdd, deleteCall, onEdit) => [{
  title: 'Consecutivo',
  dataIndex: 'index',
  key: 'index',
  render: (text, record, index) => index + 1,
}, {
  title: 'Año',
  dataIndex: 'year',
  key: 'year',
}, {
  title: 'Fecha cierre de la convocatoria',
  dataIndex: 'dateToFinishCall',
  key: 'dateToFinishCall',
}, {
  title: 'Fecha límite para hacer la encuesta',
  dataIndex: 'deadlineToMakeSurvey',
  key: 'deadlineToMakeSurvey',
}, {
  title: 'Acción',
  dataIndex: 'Id',
  key: 'delete',
  render: (text, record) => (
    <Fragment>
      <Tooltip title="Agregar">
        <Button
          shape="circle"
          icon="plus"
          onClick={() => onAdd()}
        />
      </Tooltip>
      <Tooltip title="Editar">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => onEdit(record)}
        />
      </Tooltip>
    </Fragment>
  ),
}];

export default columnsCall;
