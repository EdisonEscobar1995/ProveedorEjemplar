import React from 'react';
import { Table, Input, Icon } from 'antd';

const Search = Input.Search;

function Call(props) {
  const { columns, data, loading, searchValue, searchCall, changeSearchCall } = props;

  return (
    <div>
      <Search
        size="large"
        placeholder="Buscar"
        style={{ width: 200 }}
        value={searchValue}
        prefix={<Icon type="close" style={{ cursor: 'pointer' }} onClick={e => searchCall(e.target.value)} />}
        onChange={event => (
          changeSearchCall(event.target.value))}
        onSearch={value => (
          searchCall(value))}
      />
      <Table
        rowKey={record => record.id}
        loading={loading}
        columns={columns}
        dataSource={data && data.filter(x => x.visible)}
      />
    </div>
  );
}

export default Call;
