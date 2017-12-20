import React from 'react';
import { Popconfirm } from 'antd';
import FormattedMessage from './FormattedMessage';

function Confirm({ method, title = 'Confirm.title', children }) {
  return (
    <Popconfirm okText="Si" cancelText="No" title={<FormattedMessage id={title} />} onConfirm={method}>
      {children}
    </Popconfirm>
  );
}
export default Confirm;
