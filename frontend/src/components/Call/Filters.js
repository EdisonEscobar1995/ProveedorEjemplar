import React, { Component } from 'react';
import filtersData from './filtersData';
import DinamicForm from '../shared/DinamicForm';

class Filters extends Component {
  handleFilter = () => {
    console.log('filtering in component');
    this.props.filterSuppliers(this.props.form.getFieldsValue());
  };

  render() {
    const { Form } = this.props;
    const { getFieldDecorator, setFields } = this.props.form;
    const fields = filtersData(this.handleFilter);

    return (
      <div>
        <Form>
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
