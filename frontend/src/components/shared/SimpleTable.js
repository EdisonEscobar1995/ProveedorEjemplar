import React, { Component } from 'react';
import { Table, Input, InputNumber, Button, Tooltip, Switch } from 'antd';
import styled from 'styled-components';
import FormattedMessage from '../shared/FormattedMessage';
import Confirm from '../shared/Confirm';
import LangIntl from '../../utils/translate';

const TableStyle = styled(Table)`
  margin: ${props => props.theme.spaces.main} 0;
`;
const InputNumberStyle = styled(InputNumber)`
  width: 100%;
`;

const { Column } = Table;

class SimpleTable extends Component {
  static translator;

  state = {
    copyData: [],
  };

  componentWillMount() {
    SimpleTable.translator = LangIntl.getIntl();
    const {
      data,
    } = this.props;
    let copyData;
    if (data) {
      copyData = [...data];
      if (copyData && copyData.length === 0) {
        copyData.push({
          key: 0,
        });
      }
    }
    this.setState({ copyData });
  }

  addData = () => {
    const { copyData } = this.state;
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
    copyData.push(data);
    this.setState({ copyData });
  }

  deleteData = (record, index) => {
    const { copyData } = this.state;
    copyData.splice(index, 1);
    this.setState({ copyData }, () => {
      this.props.deleteData(copyData, record, index);
    });
  }

  updateData = (value, index, key) => {
    const { copyData } = this.state;
    copyData[index][key] = value;
    this.setState({ copyData }, () => {
      this.props.updateField(value, index, key);
    });
  }

  render() {
    const {
      colummns,
      disabled,
      updateField,
    } = this.props;
    const { copyData } = this.state;
    return (
      <TableStyle
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
                render={(text, record, index) => {
                  const inputProps = {
                    defaultValue: text,
                    disabled,
                    placeholder: SimpleTable.translator.formatMessage({ id: column.title }),
                    onBlur: (e) => {
                      const value = e.target.value;
                      if (updateField && value) {
                        this.updateData(value, index, column.key);
                      }
                    },
                  };
                  let fieldContent = null;
                  switch (column.type) {
                    case 'number':
                      fieldContent = <InputNumberStyle min={0} max={100} {...inputProps} />;
                      break;
                    case 'switch':
                      fieldContent = (
                        <Switch
                          defaultChecked={false}
                          checked={record[column.key]}
                          disabled={disabled}
                          onChange={(value) => {
                            if (updateField) {
                              this.updateData(value, index, column.key);
                            }
                          }
                          }
                        />
                      );
                      break;
                    default:
                      fieldContent = <Input {...inputProps} type={column.type} />;
                      break;
                  }
                  return fieldContent;
                }
                }
              />
            ),
          )
        }
        {
          !disabled &&
          <Column
            title={<FormattedMessage id="Table.action" />}
            key="action"
            render={(text, record, index) =>
              (
                <div>
                  {
                    copyData && copyData.length > 1 && (
                      <Confirm method={() => this.deleteData(record, index)}>
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
                      onClick={(e) => {
                        e.preventDefault();
                        this.addData(record);
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
