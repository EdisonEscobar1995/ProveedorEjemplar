import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/Alert/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import Alert from './Alert';

class AlertContainer extends Component {
  componentDidMount() {
    this.props.getAlert();
  }

  render() {
    const componentList = [
      {
        title: 'Configurar alertas',
        component: Alert,
        columns: columnsData(this.props.data),
      },
    ];

    return (
      <GenericTable
        {...this.props}
        level={0}
        componentList={componentList}
        expandable={false}
        pagination
        withOutAddOptions
      />
    );
  }
}

const mapStateToProps = state => (
  {
    data: state.alert.data,
    loading: state.alert.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(AlertContainer);
