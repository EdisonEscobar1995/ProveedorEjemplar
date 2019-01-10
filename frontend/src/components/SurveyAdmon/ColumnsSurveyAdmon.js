import React, { Fragment } from 'react';
import { Tooltip, Button } from 'antd';

const columnsData = (props, onAdd, onEdit, onCopy) => [{
  title: 'Convocatoria',
  key: 'idCall',
  render: (text, record) => {
    let call = props.call.find(x => x.id === record.idCall);
    call = call ? call.year : '';
    return call;
  },
  sorter: (a, b) => {
    const callA = props.call.find(x => x.id === a.idCall);
    const callB = props.call.find(x => x.id === b.idCall);
    return callA.year - callB.year;
  },
}, {
  title: 'Tipo de suministro',
  key: 'idSupply',
  render: (text, record) => {
    let supply = props.supply.find(x => x.id === record.idSupply);
    supply = supply ? supply.name : '';
    return supply;
  },
}, {
  title: 'Tamaño de la empresa',
  key: 'idCompanySize',
  render: (text, record) => {
    let companySize = props.companySize.find(x => x.id === record.idCompanySize);
    companySize = companySize ? companySize.name : '';
    return companySize;
  },
}, {
  title: 'Acción',
  dataIndex: 'Id',
  key: 'delete',
  render: (text, record) => (
    <Fragment>
      <Tooltip title="Editar">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => onEdit(record)}
        />
      </Tooltip>
      <Tooltip title="Agregar">
        <Button
          shape="circle"
          icon="plus"
          onClick={() => onAdd()}
        />
      </Tooltip>
      <Tooltip title="Copiar">
        <Button
          shape="circle"
          icon="copy"
          onClick={() => onCopy(record)}
        />
      </Tooltip>
    </Fragment>
  ),
}];

export default columnsData;
