import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/SurveyAdmon/action';
import GenericTable from '../shared/GenericTable';
import columnsDimension from './columnsDimension';
import columnsCriterion from './columnsCriterion';
import columnsQuestion from './columnsQuestion';

function QuestionSelected(props) {
  const questionDeselectedMethod = (questionData) => {
    props.questionSelected(questionData, 'deselected');
  };
  const componentList = [
    {
      title: 'Dimensiones de preguntas',
      columns: columnsDimension,
      onExpandMethod: null,
      onCollapseMethod: props.collapseDimension,
    },
    {
      title: 'Criterios de preguntas',
      columns: columnsCriterion,
      onExpandMethod: null,
      onCollapseMethod: props.collapseCriterion,
    },
    {
      title: 'Preguntas',
      columns: columnsQuestion,
      onRowClick: questionDeselectedMethod,
      style: { cursor: 'pointer' },
    },
  ];
  return (
    <GenericTable
      {...props}
      level={0}
      componentList={componentList}
      expandable
      withOutActions
      pagination
      withOutAdd
    />
  );
}

const mapStateToProps = state => ({
  loading: state.surveyAdmon.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(QuestionSelected);
