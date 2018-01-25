import React, { Component } from 'react';
import { Table, Input, Button, Tooltip } from 'antd';
import styled from 'styled-components';
import FormattedMessage from '../shared/FormattedMessage';
import Confirm from '../shared/Confirm';
import { getIntl } from '../../utils/translate';

const translator = getIntl();

const TableStyle = styled(Table)`
  margin: ${props => props.theme.spaces.main} 0;
`;
const { Column } = Table;

class SimpleTable extends Component {
  addData = () => {
    let key = 0;
    this.props.data.forEach((element) => {
      key = element.key > key ? element.key : key;
    });
    key += 1;
    const data = {
      key,
    };
    this.props.colummns.forEach((column) => {
      data[column.key] = '';
    });
    this.props.addData(data, key);
  }
  render() {
    const { data, colummns, deleteData, disabled, updateField } = this.props;
    const copyData = [...data];
    if (copyData && copyData.length === 0) {
      copyData.push({
        key: 0,
      });
    }
    return (
      <TableStyle
        rowKey={record => record.key}
        pagination={false}
        dataSource={copyData}
      >
        {
          colummns.map(column =>
            (
              <Column
                title={<FormattedMessage id={column.title} />}
                key={column.key}
                dataIndex={column.key}
                render={(text, record, index) =>
                  (
                    <Input
                      defaultValue={text}
                      disabled={disabled}
                      type={column.type}
                      placeholder={translator.formatMessage({ id: column.title })}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (updateField && value) {
                          updateField(value, index, column.key);
                        }
                      }}
                    />
                  )
                }
              />
            ),
          )
        }
        {
          disabled ?
            ''
            :
            <Column
              title={<FormattedMessage id="Table.action" />}
              key="action"
              render={(text, record, index) =>
                (
                  <div>
                    <Confirm method={() => deleteData(record, index)}>
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
                        onClick={(e) => {
                          e.preventDefault();
                          this.addData(index);
                        }}
                      />
                    </Tooltip>
                  </div>
                )
              }
            />
        }
      </TableStyle>
    );
  }
}

export default SimpleTable;
