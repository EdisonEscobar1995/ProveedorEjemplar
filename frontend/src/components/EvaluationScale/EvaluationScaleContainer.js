import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/EvaluationScale/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import EvaluationScale from './EvaluationScale';

class EvaluationScaleontainer extends Component {
  componentDidMount() {
    this.props.getEvaluationScales();
  }

  render() {
    const componentList = [
      {
        title: 'Escalas de evaluación',
        component: EvaluationScale,
        columns: columnsData(this.props.masters),
        deleteMethod: this.props.deleteEvaluationScale,
        onChangeSearchMethod: this.props.changeSearchEvaluationScale,
        onSearchMethod: this.props.searchEvaluationScale,
      },
    ];

    return (
      <GenericTable
        {...this.props}
        level={0}
        componentList={componentList}
        expandable={false}
        pagination
      />
    );
  }
}

const mapStateToProps = state => (
  {
    data: state.evaluationScale.data,
    searchValue: state.evaluationScale.searchValue,
    masters: state.evaluationScale.masters,
    loading: state.evaluationScale.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(EvaluationScaleontainer);
