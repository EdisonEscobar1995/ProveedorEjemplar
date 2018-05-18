import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../state/SurveyAdmon/action';
import SurveyAdmon from './SurveyAdmon';
import ColumnsSurveyAdmon from './ColumnsSurveyAdmon';

const pathSurveyAdmonForm = '/surveyAdmon/form';

class SurveyAdmonContainer extends Component {
  componentDidMount() {
    this.props.getAllSurveyAdmons();
  }

  onEdit = (record) => {
    const { history } = this.props;
    history.push(`${pathSurveyAdmonForm}/${record.id}`);
  }

  onAdd = () => {
    const { history } = this.props;
    history.push(`${pathSurveyAdmonForm}`);
  }

  deleteSurveyAdmon = (id) => {
    this.props.deleteSurveyAdmon(id);
  }

  render() {
    const template =
    ColumnsSurveyAdmon(this.props, this.onAdd, this.deleteSurveyAdmon, this.onEdit);
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
  dimension: state.surveyAdmon.dimension,
  criterion: state.surveyAdmon.criterion,
  searchValue: state.surveyAdmon.searchValue,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(SurveyAdmonContainer));

