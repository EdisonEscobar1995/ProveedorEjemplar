import React from 'react';
import { Table, Input, Icon } from 'antd';

const Search = Input.Search;

function SurveyAdmon(props) {
  const { columns, data, loading, searchValue, searchSurvey, changeSearchSurvey } = props;

  return (
    <div>
      <Search
        size="large"
        placeholder="Buscar"
        style={{ width: 200 }}
        value={searchValue}
        prefix={<Icon type="close" style={{ cursor: 'pointer' }} onClick={e => searchSurvey(e.target.value)} />}
        onChange={event => (
          changeSearchSurvey(event.target.value))}
        onSearch={value => (
          searchSurvey(value))}
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

export default SurveyAdmon;
