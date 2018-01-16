import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'antd';
import DinamicForm from '../shared/DinamicForm';

class Filter extends Component {
  handleReset = () => {
    this.props.form.resetFields();
    this.props.getData();
  }

  render() {
    const { getFields } = this.props;
    const { getFieldDecorator, setFields } = this.props.form;
    const fields = getFields(this.props);
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

const FilterForm = Form.create()(Filter);

export default FilterForm;
