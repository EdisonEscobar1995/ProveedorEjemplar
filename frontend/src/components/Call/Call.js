import React from 'react';
import { Table } from 'antd';

function Call(props) {
  const { columns, data, onRowClick, loading } = props;

  return (
    <div>
      <Table
        rowKey={record => record.id}
        loading={loading}
        columns={columns}
        dataSource={data}
        onRowClick={onRowClick}
      />
    </div>
  );
}

export default Call;
