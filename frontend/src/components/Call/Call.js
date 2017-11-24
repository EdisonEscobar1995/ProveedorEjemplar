import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';

function Call(props) {
  const { columns, data, toForm, onRowClick, loading } = props;

  return (
    <div>
      <Link to={toForm}>
        <Button
          type="primary"
        >Nueva convocatoria</Button>
      </Link>
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
