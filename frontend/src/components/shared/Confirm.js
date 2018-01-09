import React from 'react';
import { Popconfirm } from 'antd';
import FormattedMessage from './FormattedMessage';

function Confirm({ method, title = 'Confirm.title', children, preventTranlate }) {
  let confirm = title;
  if (!preventTranlate) {
    confirm = <FormattedMessage id={title} />;
  }
  return (
    <Popconfirm okText="Si" cancelText="No" title={confirm} onConfirm={method}>
      {children}
    </Popconfirm>
  );
}
export default Confirm;
