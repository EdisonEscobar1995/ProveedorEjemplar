import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Form } from 'antd';
import * as actions from '../../state/Results/action';
import Filters from './Filters';

const FormFiltersHoc = Form.create()(Filters);

class ResultsContainer extends Component {
  componentDidMount() {
    this.props.getMasters();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <FormFiltersHoc
          {...this.props}
          Form={Form}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.results.data,
  loading: state.results.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(ResultsContainer);
