import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../state/SurveyAdmon/action';
import SurveyAdmon from './SurveyAdmon';
import ColumnsSurveyAdmon from './ColumnsSurveyAdmon';

const pathSurveyAdmonForm = '/surveyAdmon/form';

class SurveyAdmonContainer extends Component {
  componentDidMount() {
    this.props.getAllSurveys();
  }

  onAdd = () => {
    const { history } = this.props;
    history.push(`${pathSurveyAdmonForm}`);
  }

  render() {
    const template =
    ColumnsSurveyAdmon(this.props, this.onAdd);
    return (
      <SurveyAdmon
        {...this.props}
        toForm={pathSurveyAdmonForm}
        columns={template}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.surveyAdmon.loading,
  data: state.surveyAdmon.data,
  companySize: state.surveyAdmon.companySize,
  supply: state.surveyAdmon.supply,
  call: state.surveyAdmon.call,
  searchValue: state.surveyAdmon.searchValue,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(SurveyAdmonContainer));

