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
        onSearchMethod: this.props.searchEvaluationScale,
      },
    ];

    return (
      <GenericTable
        {...this.props}
        level={0}
        parentId=""
        componentList={componentList}
        expandable={false}
        pagination
      />
    );
  }
}

const mapStateToProps = state => (
  {
    loading: state.evaluationScale.loading,
    data: state.evaluationScale.data,
    masters: state.evaluationScale.masters,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(EvaluationScaleontainer);
