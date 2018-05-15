import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/DimensionAndCriterion/action';
import GenericTable from '../shared/GenericTable';
import columnsDimension from './columnsDimension';
import columnsCriterion from './columnsCriterion';
import Dimension from './Dimension';
import Criterion from './Criterion';

class DimensionContainer extends Component {
  componentDidMount() {
    this.props.getDimensions();
  }

  render() {
    const componentList = [
      {
        title: 'Dimensiones de preguntas',
        component: Dimension,
        columns: columnsDimension,
        deleteMethod: this.props.deleteDimension,
        onExpandMethod: this.props.getCriterionByDimension,
        onCollapseMethod: this.props.collapseDimension,
        onChangeSearchMethod: this.props.changeSearchDimension,
        onSearchMethod: this.props.searchDimension,
      },
      {
        title: 'Criterios de las preguntas',
        component: Criterion,
        columns: columnsCriterion,
        deleteMethod: this.props.deleteCriterion,
        onChangeSearchMethod: this.props.changeSearchCriterion,
        onSearchMethod: this.props.searchCriterion,
      },
    ];

    return (
      <GenericTable
        {...this.props}
        level={0}
        componentList={componentList}
        expandable
        pagination
        withDelete
      />
    );
  }
}

const mapStateToProps = state => (
  {
    data: state.dimensionAndCriterion.data,
    searchValue: state.dimensionAndCriterion.searchValue,
    loading: state.dimensionAndCriterion.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(DimensionContainer);
