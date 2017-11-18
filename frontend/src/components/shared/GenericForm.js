import React, { Component } from 'react';
import { Table, Input, Popconfirm, Form, Button } from 'antd';

const { Column } = Table;
const { Item } = Form;

class GenericFormTable extends Component {
  state = {
    data: this.props.data,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const row = this.state.row;
    const colummns = this.props.colummns;
    const validateFields = colummns.map(item => `${row}-${item.dataIndex}`);
    this.props.form.validateFields(validateFields);
    const dataForm = this.props.form.getFieldsValue();
    const rowValue = {};
    let send = true;
    colummns.forEach((column) => {
      const value = dataForm[`${row}-${column.dataIndex}`];
      rowValue[column.dataIndex] = value;
      if (!value) {
        send = false;
      }
    });
    if (send) {
      const newData = [...this.state.data];
      const actualRowValue = newData[row];
      delete newData[row].editable;
      newData[row] = Object.assign(actualRowValue, rowValue);
      this.setState({ data: newData });
    }
  }

  editRow = (key) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  selectRow = (row) => {
    this.setState({
      row,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Table dataSource={this.state.data}>
          {
            this.props.colummns.map(column => (
              (
                <Column
                  title={column.title}
                  dataIndex={column.dataIndex}
                  key={column.key}
                  render={(text, record) => {
                    const id = `${record.key}-${column.dataIndex}`;
                    return (
                      record.editable ?
                        (
                          <Item>
                            {
                              getFieldDecorator(id, {
                                rules: [{ required: true, message: 'Por favor ingrese un valor' }],
                                initialValue: text,
                              })(
                                <Input placeholder="Username" />,
                              )
                            }
                          </Item>
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
              const { editable } = record;
              return (
                <div>
                  {
                    editable ?
                      <div>
                        <Button
                          onClick={() => { this.selectRow(record.key); }}
                          type="primary"
                          htmlType="submit"
                        >
                          Guardar
                        </Button>
                        <Popconfirm okText="Si" cancelText="No" title="Cancelar?" onConfirm={() => this.cancel(record.key)}>
                          <a>Cancel</a>
                        </Popconfirm>
                      </div>
                      :
                      <Button
                        role="button"
                        onClick={() => { this.editRow(record.key); }}
                      >Edit</Button>
                  }
                </div>
              );
            }
            }
          />

        </Table>
      </Form>
    );
  }
}

const GenericForm = Form.create()(GenericFormTable);

export default GenericForm;
