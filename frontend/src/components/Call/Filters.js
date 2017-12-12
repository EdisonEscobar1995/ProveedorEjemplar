import React, { Component } from 'react';
import filtersData from './filtersData';
import DinamicForm from '../shared/DinamicForm';

class Filters extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.filterCalledSuppliers(this.props.form.getFieldsValue());
  }

  render() {
    const { Form } = this.props;
    const { getFieldDecorator, setFields } = this.props.form;
    const fields = filtersData();

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            setFields={setFields}
            content={fields}
          />
        </Form>
      </div>
    );
  }
}

export default Filters;
