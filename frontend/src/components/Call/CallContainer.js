import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../state/Call/action';
import Call from './Call';
import columns from './columnsCall';

const pathCallForm = '/call/form';

class CallContainer extends Component {
  componentDidMount() {
    this.props.getAllCalls();
  }

  onRowClick = (record) => {
    const { history } = this.props;
    history.push(`${pathCallForm}/${record.id}`);
  }

  render() {
    return (
      <Call
        {...this.props}
        toForm={pathCallForm}
        columns={columns}
        onRowClick={this.onRowClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.call.loading,
  data: state.call.data,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(CallContainer));
