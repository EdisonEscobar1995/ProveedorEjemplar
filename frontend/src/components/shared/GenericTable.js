import React from 'react';
import { Table, Spin, Button, Tooltip, Input, Icon } from 'antd';
import styled from 'styled-components';
import Confirm from './Confirm';
import FormattedMessage from './FormattedMessage';
import H1 from '../shared/H1';
import SimpleSelect from '../shared/SimpleSelect';

const { Column } = Table;
const Search = Input.Search;

const Text = styled.span`
  margin-bottom: 4px;
  margin-left: 5px;
`;

function GenericTable(props) {
  const {
    level,
    parentId,
    componentList,
    openModal,
    loading,
    data,
    disabled,
    expandable,
    pagination,
    searchValue,
    // rowSelection = false,
    withDelete = false,
    withOutActions = false,
    withOutAdd = false,
    // changeSelection,
    // selectRow,
    // selectAllRows,
  } = props;

  // const rowSelectionActions = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     if (changeSelection) {
  //       changeSelection(selectedRowKeys, selectedRows);
  //     }
  //   },
  //   onSelect: (record, selected, selectedRows) => {
  //     console.log(record, selected, selectedRows);
  //     if (selectRow) {
  //       selectRow(record, selected, selectedRows);
  //     }
  //   },
  //   onSelectAll: (selected, selectedRows, changeRows) => {
  //     if (selectAllRows) {
  //       selectAllRows(selected, selectedRows, changeRows);
  //     }
  //   },
  // };

  return (
    <Spin spinning={loading}>
      <H1 text={componentList[level].title} />
      {
        data && data.length > 0 ? (
          <div>
            <span>
              {
                componentList[level].onSearchMethod && (
                  <Search
                    size="large"
                    placeholder="Buscar"
                    style={{ width: 200 }}
                    value={searchValue}
                    prefix={<Icon type="close" style={{ cursor: 'pointer' }} onClick={() => (componentList[level].onSearchMethod('', parentId))} />}
                    onChange={event => (
                      componentList[level].onChangeSearchMethod(event.target.value, parentId))}
                    onSearch={value => (
                      componentList[level].onSearchMethod(value, parentId))}
                  />
                )
              }
              {
                componentList[level].filters &&
                componentList[level].filters.map(filter => (
                  <span>
                    <Text>{filter.label ? filter.label : ''}</Text>
                    <SimpleSelect
                      options={filter.options}
                      mode={filter.mode}
                      handleChange={filter.handleChange}
                      onSelect={filter.onSelect}
                      onDeselect={filter.deselect}
                      group={filter.group}
                      style={{ width: 200 }}
                      labelOptions={filter.labelOptions}
                    />
                  </span>
                ))
              }
            </span>
            <Table
              pagination={pagination}
              rowKey={record => record.id}
              dataSource={componentList[level].onSearchMethod ?
                data.filter(element => element.visible) : data}
              onExpand={expandable ? (expanded, record) => {
                if (!record.data && expanded && componentList[level].onExpandMethod) {
                  componentList[level].onExpandMethod(record.id);
                } else if (!expanded) {
                  componentList[level].onCollapseMethod(record);
                }
              } : null}
              expandedRowRender={
                expandable ? record => (
                  record.data && record.data.length > 0 ? (
                    <GenericTable
                      {...props}
                      level={level + 1}
                      componentList={componentList}
                      parentId={record.id}
                      data={record.data}
                      disabled={record.disabled}
                      expandable={record.expandable}
                      searchValue={record.searchValue}
                      loading={false}
                      pagination={pagination}
                      // rowSelection={rowSelection && rowSelectionActions}
                    />
                  ) : (
                    !withOutAdd &&
                    <div>
                      <H1 text={componentList[level + 1].title} />
                      <Button
                        onClick={() => {
                          const Component = componentList[level + 1].component;
                          openModal(<Component {...props} parentId={record.id} />);
                        }}
                      >
                        Agregar
                      </Button>
                    </div>
                  )
                ) : null
              }
              // rowSelection={rowSelection && rowSelectionActions}
              style={componentList[level].style}
              onRowClick={componentList[level].onRowClick ? (record) => {
                componentList[level].onRowClick(record);
              } : null}
              // onRow={(record, index) => {
              //   if (componentList[level].rowSelected) {
              //     return {
              //       selectRow: componentList[level].rowSelected(record, index),
              //     };
              //   }
              //   return null;
              // }}
            >
              {
                componentList[level].columns.map(column => (
                  (
                    <Column
                      title={<FormattedMessage id={column.title} />}
                      key={column.key}
                      dataIndex={column.key}
                      render={column.render}
                      sorter={column.sorter}
                    />
                  )
                ))
              }
              {
                (disabled || !withOutActions) &&
                  <Column
                    title={<FormattedMessage id="Table.action" />}
                    key="action"
                    render={(text, record) => (
                      <div>
                        <Tooltip title={<FormattedMessage id="Button.edit" />}>
                          <Button
                            shape="circle"
                            icon="edit"
                            onClick={() => {
                              // if (componentList[level].editMethod) {
                              //   componentList[level].editMethod(record);
                              // }
                              const Component = componentList[level].component;
                              openModal(<Component {...props} record={record} />);
                            }}
                          />
                        </Tooltip>
                        {
                          withDelete &&
                          (
                            <Confirm method={() => componentList[level].deleteMethod(record)}>
                              <Tooltip title={<FormattedMessage id="Button.delete" />}>
                                <Button
                                  type="danger"
                                  shape="circle"
                                  icon="delete"
                                />
                              </Tooltip>
                            </Confirm>
                          )
                        }
                        <Tooltip title={<FormattedMessage id="Button.add" />}>
                          <Button
                            shape="circle"
                            icon="plus"
                            onClick={() => {
                              const Component = componentList[level].component;
                              openModal(<Component {...props} remoteId={record.id} />);
                            }}
                          />
                        </Tooltip>
                      </div>
                    )}
                  />
              }
            </Table>
          </div>
        ) : (
          !withOutAdd &&
          <Button
            onClick={() => {
              const Component = componentList[level].component;
              openModal(<Component {...props} />);
            }}
          >
            Agregar
          </Button>
        )
      }
    </Spin>
  );
}

export default GenericTable;
