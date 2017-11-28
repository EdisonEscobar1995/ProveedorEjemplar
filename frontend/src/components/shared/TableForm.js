import React, { Component } from 'react';
import { Table, Input, Form, Spin, Button } from 'antd';
import styled from 'styled-components';
import Confirm from './Confirm';

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
    this.props.form.validateFields(validateFields, (err) => {
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
  addData = () => {
    const data = {
      editable: true,
    };
    this.props.colummns.forEach((column) => {
      data[column.key] = '';
    });
    this.props.addData(data);
  }
  render() {
    const {
      loading,
      data,
      colummns,
      editData,
      deleteData,
      cancelData,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    const config = {
      emptyText: 'No hay contenido para mostrar',
    };
    let content = '';
    if (data.length > 0) {
      content = (
        <TableStyle pagination={false} locale={config} dataSource={data}>
          {
            colummns.map(column => (
              (
                <Column
                  title={column.title}
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
                                <Input type={column.type} placeholder={column.title} />,
                              )
                            }
                          </ItemStyle>
                        )
                        :
                        (<span>{column.type === 'number' ? text : text }</span>)
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
                title="Action"
                key="action"
                render={(text, record, index) => {
                  const { editable, id } = record;
                  return (
                    <div>
                      {
                        editable ?
                          (<Button
                            shape="circle"
                            icon="save"
                            htmlType="submit"
                            onClick={() => this.selectRow(index, record)}
                          />)
                          :
                          (<Button
                            shape="circle"
                            icon="edit"
                            onClick={(e) => {
                              e.preventDefault();
                              editData(index);
                            }}
                          />)
                      }
                      <Confirm method={() => deleteData(record, index)}>
                        <Button
                          shape="circle"
                          icon="delete"
                        />
                      </Confirm>
                      {
                        id && editable ?
                          <Confirm method={() => cancelData(index)}>
                            <Button
                              shape="circle"
                              icon="close-circle-o"
                            />
                          </Confirm>
                          :
                          ''
                      }
                    </div>
                  );
                }
                }
              />
          }
        </TableStyle>
      );
    }
    return (
      <Spin spinning={loading}>
        {
          this.props.disabled ?
            ''
            :
            <Button type="primary" onClick={this.addData}>Add</Button>
        }
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
