import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Form } from 'antd';
import * as actions from '../../state/Surveys/action';
import Filters from './Filters';
import Surveys from './Surveys';

const FormFiltersHoc = Form.create()(Filters);

class SurveysContainer extends Component {
  componentDidMount() {
    const year = '';
    this.props.getSurveys(year);
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <FormFiltersHoc
          {...this.props}
          Form={Form}
        />
        <Surveys
          {...this.props}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.surveys.data,
  loading: state.surveys.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(SurveysContainer);
