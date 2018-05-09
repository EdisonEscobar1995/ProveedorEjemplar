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

  onEdit = (record) => {
    const { history } = this.props;
    history.push(`${pathCallForm}/${record.id}`);
  }

  onAdd = () => {
    const { history } = this.props;
    history.push(`${pathCallForm}`);
  }

  deleteCall = (id) => {
    this.props.deleteCall(id);
  }

  render() {
    const template = columns(this.onAdd, this.deleteCall, this.onEdit);
    return (
      <Call
        {...this.props}
        toForm={pathCallForm}
        columns={template}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.call.loading,
  data: state.call.data,
  searchValue: state.call.searchValue,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(CallContainer));
