import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/DimensionAndCriterion/action';
import GenericTable from '../shared/GenericTable';
import columnsDimension from './columnsDimension';
import columnsCriterion from './columnsCriterion';

class ListQuestion extends Component {
  componentDidMount() {
    this.props.getDimensions();
  }

  render() {
    const componentList = [
      {
        title: 'Dimensiones de preguntas',
        columns: columnsDimension,
        onExpandMethod: this.props.getQuestionsByDimension,
        onCollapseMethod: this.props.collapseDimension,
        onChangeSearchMethod: this.props.changeSearchByWord,
        onSearchMethod: this.props.searchByWord,
        filters: [{
          options: [],
          mode: 'multiple',
        }],
      },
      {
        title: 'Preguntas',
        columns: columnsCriterion,
      },
    ];

    return (
      <GenericTable
        {...this.props}
        level={0}
        componentList={componentList}
        expandable
        withOutActions
        pagination
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
)(ListQuestion);
