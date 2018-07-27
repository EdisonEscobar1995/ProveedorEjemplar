import React from 'react';
import { Table, Input, Icon } from 'antd';

const Search = Input.Search;

function Question(props) {
  const { columns, data, loading, searchValue, searchQuestion, changeSearchQuestion } = props;

  return (
    <div>
      <Search
        size="large"
        placeholder="Buscar"
        style={{ width: 200 }}
        value={searchValue}
        prefix={<Icon type="close" style={{ cursor: 'pointer' }} onClick={e => searchQuestion(e.target.value)} />}
        onChange={event => (
          changeSearchQuestion(event.target.value))}
        onSearch={value => (
          searchQuestion(value))}
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

export default Question;
