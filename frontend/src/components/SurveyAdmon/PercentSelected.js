import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/SurveyAdmon/action';
import GenericTable from '../shared/GenericTable';
import columnsDimension from './columnsDimensionPercent';
import columnsCriterion from './columnsCriterionPercent';
import DimensionPercent from '../DimensionAndCriterion/DimensionPercent';
import CriterionPercent from '../DimensionAndCriterion/CriterionPercent';

function PercentSelected(props) {
  const componentList = [
    {
      title: 'Dimensiones',
      component: DimensionPercent,
      columns: columnsDimension,
      onExpandMethod: null,
      onCollapseMethod: props.collapseDimension,
    },
    {
      title: 'Criterios',
      component: CriterionPercent,
      columns: columnsCriterion,
    },
  ];
  return (
    <GenericTable
      {...props}
      level={0}
      componentList={componentList}
      expandable
      withOutAddOptions
      // withOutActions
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
)(PercentSelected);
