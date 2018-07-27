import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/SurveyAdmon/action';
import GenericTable from '../shared/GenericTable';
import columnsDimension from './columnsDimension';
import columnsQuestion from './columnsQuestion';

function ListQuestion(props) {
  const {
    data,
    criterions,
    getQuestionsByDimension,
    collapseDimension,
    changeSearchByDimension,
    changeSearchByQuestion,
    searchByDimension,
    getCriterionByDimension,
    dropCriterionByDimension,
    searchQuestion,
    questionSelected,
    filterByCriterion,
    deselectedByCriterion,
  } = props;
  const questionSelectedMethod = (questionData) => {
    questionSelected(questionData, 'selected');
  };
  const componentList = [
    {
      title: 'Dimensiones de preguntas',
      columns: columnsDimension,
      onExpandMethod: getQuestionsByDimension,
      onCollapseMethod: collapseDimension,
      onChangeSearchMethod: changeSearchByDimension,
      onSearchMethod: searchByDimension,
      filters: [{
        options: data,
        mode: 'multiple',
        label: 'Dimensión',
        onSelect: getCriterionByDimension,
        deselect: dropCriterionByDimension,
      }, {
        options: criterions,
        mode: 'multiple',
        label: 'Criterio',
        onSelect: filterByCriterion,
        deselect: deselectedByCriterion,
      }],
    },
    {
      title: 'Preguntas',
      columns: columnsQuestion,
      onChangeSearchMethod: changeSearchByQuestion,
      onSearchMethod: searchQuestion,
      onRowClick: questionSelectedMethod,
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
  criterions: state.surveyAdmon.criterions,
  loading: state.surveyAdmon.loading,
  labelOptions: state.surveyAdmon.labelOptions,
  searchValue: state.surveyAdmon.searchValue,
});

export default connect(
  mapStateToProps,
  actions,
)(ListQuestion);
