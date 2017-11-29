import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import filtersData from './filtersData';
import DinamicForm from '../shared/DinamicForm';

class Filters extends Component {
  handleFilter = () => {
    this.props.filterModifiedSuppliers(this.props.form.getFieldsValue());
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.props.getModifiedSuppliers();
  }

  render() {
    const { Form } = this.props;
    const { getFieldDecorator, setFields } = this.props.form;
    const fields = filtersData(this.props);

    return (
      <div>
        <Form>
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            setFields={setFields}
            content={fields}
          />
        </Form>
        <Row type="flex" justify="center" style={{ marginBottom: '20px' }}>
          <Col span={2}>
            <Button type="primary" onClick={this.handleReset}>Limpiar</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Filters;
