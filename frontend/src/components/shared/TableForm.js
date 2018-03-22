import React, { Component } from 'react';
import { Table, Input, Form, Spin, Button, Tooltip } from 'antd';
import styled from 'styled-components';
import Confirm from './Confirm';
import FormattedMessage from './FormattedMessage';
import { getIntl } from '../../utils/translate';

const translator = getIntl();

const { Column } = Table;
const { Item } = Form;

const ItemStyle = styled(Item)`
  margin: 0;
`;
const TableStyle = styled(Table)`
  margin: ${props => props.theme.spaces.main} 0;
`;

class GenericFormTable extends Component {
  state = {};
  getFieldValue = () => {
    const { row, record } = this.state;
    const colummns = this.props.colummns;
    const validateFields = colummns.map(item => `${row}-${item.key}`);
    let returnValue = null;
    this.props.form.validateFieldsAndScroll(validateFields, (err) => {
      if (!err) {
        const dataForm = this.props.form.getFieldsValue();
        const rowValue = {};
        let send = true;
        colummns.forEach((column) => {
          const value = dataForm[`${row}-${column.key}`];
          rowValue[column.key] = value;
          if (!value) {
            send = false;
          }
        });
        rowValue.id = record.id;
        if (send) {
          returnValue = {
            value: rowValue,
            row,
          };
        }
      }
    });
    return returnValue;
  }
  saveData = (e) => {
    e.preventDefault();
    const result = this.getFieldValue();
    if (result) {
      const { value, row } = result;
      if (value) {
        this.props.saveData(value, row);
      }
    }
  }
  selectRow = (row, record) => {
    this.state.row = row;
    this.state.record = record;
  }
  addData = (index) => {
    const data = {
      editable: true,
    };
    this.props.colummns.forEach((column) => {
      data[column.key] = '';
    });
    this.props.addData(data, index);
  }
  render() {
    const {
      loading,
      data,
      colummns,
      editData,
      deleteData,
      cancelData,
      disabled,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    let content = '';
    if (data && data.length === 0) {
      data.push({
        key: 0,
        editable: true,
      });
    }
    content = (
      <TableStyle dataSource={data}>
        {
          colummns.map(column => (
            (
              <Column
                title={<FormattedMessage id={column.title} />}
                key={column.key}
                dataIndex={column.key}
                render={(text, record) => {
                  const id = `${record.key}-${column.key}`;
                  const rules = column.rules || [];
                  return (
                    record.editable ?
                      (
                        <ItemStyle>
                          {
                            getFieldDecorator(id, {
                              rules: [
                                { required: true, message: 'Por favor ingrese un valor' },
                                ...rules,
                              ],
                              initialValue: text,
                            })(
                              <Input
                                disabled={disabled}
                                type={column.type}
                                placeholder={translator.formatMessage({ id: column.title })}
                                onBlur={(e) => {
                                  if (this.props.updateField) {
                                    this.props.updateField(e.target.value, record, column.key);
                                  }
                                }}
                              />,
                            )
                          }
                        </ItemStyle>
                      )
                      :
                      (<span>{text}</span>)
                  );
                }
                }
              />
            )
          ))
        }
        {
          this.props.disabled ?
            ''
            :
            <Column
              title={<FormattedMessage id="Table.action" />}
              key="action"
              render={(text, record, index) => {
                const { editable, id } = record;
                return (
                  <div>
                    {
                      editable ?
                        (
                          <Tooltip title={<FormattedMessage id="Button.save" />}>
                            <Button
                              shape="circle"
                              icon="save"
                              htmlType="submit"
                              onClick={() => this.selectRow(index, record)}
                            />
                          </Tooltip>
                        )
                        :
                        (
                          <Tooltip title={<FormattedMessage id="Button.edit" />}>
                            <Button
                              shape="circle"
                              icon="edit"
                              onClick={(e) => {
                                e.preventDefault();
                                editData(index);
                              }}
                            />
                          </Tooltip>
                        )
                    }
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
                    {
                      id && editable && (
                        <Tooltip title={<FormattedMessage id="Button.cancel" />}>
                          <Confirm method={() => cancelData(index)}>
                            <Button
                              shape="circle"
                              icon="close-circle-o"
                            />
                          </Confirm>
                        </Tooltip>
                      )
                    }
                  </div>
                );
              }
              }
            />
        }
      </TableStyle>
    );
    return (
      <Spin spinning={loading}>
        <Form onSubmit={this.saveData}>
          {
            content
          }
        </Form>
      </Spin>
    );
  }
}

const GenericForm = Form.create()(GenericFormTable);

export default GenericForm;
