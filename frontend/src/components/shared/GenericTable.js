import React from 'react';
import { Table, Spin, Button, Tooltip } from 'antd';
import styled from 'styled-components';
import Confirm from './Confirm';
import FormattedMessage from './FormattedMessage';

const TitleStyle = styled('h1')`
  color: ${props => props.theme.color.primary};
  margin-bottom: ${props => props.theme.spaces.main};
`;

const { Column } = Table;

function GenericTable(props) {
  const {
    level,
    componentList,
    openModal,
    loading,
    data,
    disabled,
    expandable,
    pagination,
  } = props;

  return (
    <Spin spinning={loading}>
      <TitleStyle>{componentList[level].title}</TitleStyle>
      {
        data && data.length > 0 ? (
          <Table
            dataSource={data}
            onExpand={expandable ? (expanded, record) => {
              if (!record.data && expanded && componentList[level].onExpandMethod) {
                componentList[level].onExpandMethod(record.id);
              }
            } : null}
            pagination={pagination}
            rowKey={record => record.id}
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
                    loading={false}
                    pagination={false}
                  />
                ) : (
                  <Button
                    onClick={() => {
                      const Component = componentList[level + 1].component;
                      openModal(<Component {...props} parentId={record.id} index={0} />);
                    }}
                  >
                    Agregar
                  </Button>
                )
              ) : null
            }
          >
            {
              componentList[level].columns.map(column => (
                (
                  <Column
                    title={<FormattedMessage id={column.title} />}
                    key={column.key}
                    dataIndex={column.key}
                  />
                )
              ))
            }
            {
              disabled ?
                null
                :
                <Column
                  title={<FormattedMessage id="Table.action" />}
                  key="action"
                  render={(text, record, index) => (
                    <div>
                      <Tooltip title={<FormattedMessage id="Button.edit" />}>
                        <Button
                          shape="circle"
                          icon="edit"
                          onClick={() => {
                            const Component = componentList[level].component;
                            openModal(<Component {...props} record={record} index={index} />);
                          }}
                        />
                      </Tooltip>
                      <Confirm method={() => componentList[level].deleteMethod(record, index)}>
                        <Tooltip title={<FormattedMessage id="Button.delete" />}>
                          <Button
                            shape="circle"
                            icon="delete"
                          />
                        </Tooltip>
                      </Confirm>
                      <Tooltip title={<FormattedMessage id="Button.add" />}>
                        <Button
                          shape="circle"
                          icon="plus"
                          onClick={() => {
                            const Component = componentList[level].component;
                            openModal(<Component {...props} index={index} />);
                          }}
                        />
                      </Tooltip>
                    </div>
                  )}
                />
            }
          </Table>
        ) : (
          <Button
            onClick={() => {
              const Component = componentList[level].component;
              openModal(<Component {...props} index={0} />);
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
