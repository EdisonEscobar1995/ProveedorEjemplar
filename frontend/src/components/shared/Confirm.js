import React from 'react';
import { Popconfirm } from 'antd';

function Confirm({ method, title = '¿Está seguro?', children }) {
  return (
    <Popconfirm okText="Si" cancelText="No" title={title} onConfirm={method}>
      {children}
    </Popconfirm>
  );
}
export default Confirm;
