import React from 'react';
import { Tooltip, Button } from 'antd';

const columnsData = (props, onAdd) => [{
  title: 'Tipo de suministro',
  key: 'idSupply',
  render: (text, record) => {
    let supply = props.supply.find(x => x.id === record.idSupply);
    supply = supply ? supply.name : '';
    return supply;
  },
  sorter: (a, b) => (a.name > b.name ? -1 : 1),
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
  render: () => (
    <Tooltip title="Agregar">
      <Button
        shape="circle"
        icon="plus"
        onClick={() => onAdd()}
      />
    </Tooltip>
  ),
}];

export default columnsData;
