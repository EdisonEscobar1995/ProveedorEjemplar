import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../state/SurveyAdmon/action';
import SurveyAdmon from './SurveyAdmon';
import ColumnsSurveyAdmon from './ColumnsSurveyAdmon';
import CopySurvey from './CopySurvey';

const pathSurveyAdmonForm = '/surveyAdmon/form';

class SurveyAdmonContainer extends Component {
  componentDidMount() {
    this.props.getAllSurveys();
  }

  onAdd = () => {
    const { history } = this.props;
    history.push(`${pathSurveyAdmonForm}`);
  }

  onEdit = (record) => {
    const { history } = this.props;
    history.push(`${pathSurveyAdmonForm}/${record.id}`);
  }

  onCopy = (record) => {
    this.props.openModal(<CopySurvey {...this.props} record={record} />);
  }

  render() {
    const template =
    ColumnsSurveyAdmon(this.props, this.onAdd, this.onEdit, this.onCopy);
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
  masters: state.surveyAdmon.masters,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(SurveyAdmonContainer));

