import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Form } from 'antd';
import * as actions from '../../state/Pendings/action';
import Filters from './Filters';
import Pendings from './Pendings';

const FormFiltersHoc = Form.create()(Filters);

class PendingsContainer extends Component {
  componentDidMount() {
    this.props.getPendings();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <FormFiltersHoc
          {...this.props}
          Form={Form}
        />
        <Pendings
          {...this.props}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.pendings.data,
  loading: state.pendings.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(PendingsContainer);
