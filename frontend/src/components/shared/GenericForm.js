import React, { Component } from 'react';
import { Table, Input, Form, Spin, Button } from 'antd';
import styled from 'styled-components';
import Confirm from './Confirm';

const { Column } = Table;
const { Item } = Form;

const ItemStyle = styled(Item)`
  margin: 0;
`;

class GenericFormTable extends Component {
  state = {
    data: this.props.data,
    actual: {},
  };
  componentWillReceiveProps(nextData) {
    this.state.actual = nextData.actual;
    this.state.data = nextData.data;
  }
  setData = (data) => {
    this.setState({
      data,
      actual: {},
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const row = this.state.row;
    const colummns = this.props.colummns;
    const validateFields = colummns.map(item => `${row}-${item.key}`);
    this.props.form.validateFields(validateFields);
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
    if (send) {
      const newData = [...this.state.data];
      const actualRowValue = newData[row];
      delete newData[row].editable;
      newData[row] = Object.assign(actualRowValue, rowValue);
      this.setData(newData);
      this.props.saveData(actualRowValue);
    }
  }

  handleAdd = () => {
    const { data } = this.state;
    const newData = {
      editable: true,
      key: `${data.length}`,
    };
    data.unshift(newData);
    this.setData(data);
  }

  deleteRow = (record) => {
    const { key } = record;
    const newData = [...this.state.data];
    const target = newData.filter(item => key !== item.key);
    this.reloadKeys(target);
    this.setData(target);
    delete record.key;
    // this.props.deleteData(record);
  }

  editRow = (key) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setData(newData);
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setData(newData);
    }
  }
  selectRow = (row) => {
    this.setState({
      row,
      actual: {},
    });
  }
  reloadKeys = (data) => {
    data.map((item, index) => {
      item.key = index;
      return item;
    });
    this.state.data = data;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    const { data, row, actual } = this.state;
    if (Object.keys(actual).length > 0) {
      console.log(actual);
      console.log(row);
    }
    const config = {
      emptyText: 'No hay contenido para mostrar',
    };
    let content = '';
    if (data.length > 0) {
      this.reloadKeys(data);
      content = (
        <Table locale={config} dataSource={data}>
          {
            this.props.colummns.map(column => (
              (
                <Column
                  title={column.title}
                  key={column.key}
                  dataIndex={column.key}
                  render={(text, record) => {
                    const id = `${record.key}-${column.key}`;
                    return (
                      record.editable ?
                        (
                          <ItemStyle>
                            {
                              getFieldDecorator(id, {
                                rules: [{ required: true, message: 'Por favor ingrese un valor' }],
                                initialValue: text,
                              })(
                                <Input placeholder={column.title} />,
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
          <Column
            title="Action"
            key="action"
            render={(text, record) => {
              const { editable, id } = record;
              return (
                <div>
                  {
                    editable ?
                      (<Button
                        shape="circle"
                        icon="save"
                        onClick={() => this.selectRow(record.key)}
                        htmlType="submit"
                      />)
                      :
                      (<Button
                        shape="circle"
                        icon="edit"
                        onClick={(e) => {
                          e.preventDefault();
                          this.editRow(record.key);
                        }}
                      />)
                  }
                  <Confirm method={() => this.deleteRow(record)}>
                    <Button
                      shape="circle"
                      icon="delete"
                    />
                  </Confirm>
                  {
                    id && editable ?
                      <Confirm method={() => this.cancel(record.key)}>
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
        </Table>
      );
    }
    return (
      <Spin spinning={loading}>
        <Button type="primary" onClick={this.handleAdd}>Add</Button>
        <Form onSubmit={this.handleSubmit}>
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
