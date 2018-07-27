import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import * as actions from '../../state/ManagerTeamSurvey/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';
import ManagerTeamSurvey from './ManagerTeamSurvey';
import H1 from '../shared/H1';

class ManagerTeamSurveyContainer extends Component {
  componentDidMount() {
    const supplierId = this.getDataSupplier();
    this.props.getManagerTeamSurvey('', supplierId);
    if (supplierId !== '') {
      this.filterSupplier(supplierId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.supplierId !== this.props.data.supplierId) {
      this.filterSupplier(nextProps.data.supplierId);
    }
  }

  getDataSupplier = () => {
    const path = this.props.location.pathname;
    const dataPath = path.split('/');
    if (dataPath.length > 2) {
      return dataPath[2];
    }
    return '';
  }

  filterSupplier = (value) => {
    const values = { supplier: value };
    this.props.filterManagerTeamSurvey(values);
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <H1
          text="Calificación comité gerencial"
        />
        <GenericForm
          {...this.props}
          formData={formData}
        />
        <ManagerTeamSurvey
          {...this.props}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.managerTeamSurvey.data,
  loading: state.managerTeamSurvey.loading,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(ManagerTeamSurveyContainer));
