import React, { PureComponent } from 'react';
import { Row, Col, Button } from 'antd';
import filtersInfo from './dataForm';
import DinamicForm from '../shared/DinamicForm';

class Filters extends PureComponent {
  render() {
    const { Form } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fields = filtersInfo(this.props.data);

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
            <Button type="primary">Consultar</Button>
          </Col>
          <Col span={2}>
            <Button type="primary">Limpiar</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Filters;
