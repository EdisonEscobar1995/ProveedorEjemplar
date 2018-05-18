import React, { Fragment } from 'react';
import { Tooltip, Button, Popconfirm as Confirm } from 'antd';

const columnsData = (props, onAdd, deleteQuestion, onEdit) => [{
  title: 'Dimensión',
  dataIndex: 'idDimension',
  key: 'idDimension',
  render: (text, record) => {
    let dimension = props.dimension.data.find(x => x.id === record.idDimension);
    dimension = dimension ? dimension.name : '';
    return dimension;
  },
}, {
  title: 'Criterio',
  dataIndex: 'idCriterion',
  key: 'idCriterion',
  render: (text, record) => {
    let criterion = props.criterion.data.find(x => x.id === record.idCriterion);
    criterion = criterion ? criterion.name : '';
    return criterion;
  },
}, {
  title: 'Pregunta',
  dataIndex: 'wording',
  key: 'wording',
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
      <Confirm title="Está seguro de eliminar la pregunta?" onConfirm={() => deleteQuestion(record)} okText="Si" cancelText="No">
        <Tooltip placement="top" title="Eliminar">
          <Button
            type="danger"
            shape="circle"
            icon="delete"
          />
        </Tooltip>
      </Confirm>
    </Fragment>
  ),
}];

export default columnsData;
