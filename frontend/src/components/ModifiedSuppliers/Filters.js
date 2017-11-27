import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import filtersInfo from './dataForm';
import DinamicForm from '../shared/DinamicForm';

class Filters extends Component {
  handleFilter = () => {
    this.props.filterSuppliers(this.props.form.getFieldsValue());
  };

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { Form } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fields = filtersInfo(this.props);

    return (
      <div>
        <Form>
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            content={fields}
          />
        </Form>
        <Row type="flex" justify="center" style={{ marginBottom: '20px' }}>
          <Col span={2}>
            <Button type="primary" onClick={this.handleFilter}>Consultar</Button>
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={this.handleReset}>Limpiar</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Filters;
