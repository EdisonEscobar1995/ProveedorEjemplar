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
    const masters = {
      ApplyTo: [
        { id: 'TECHNICAL_TEAM', name: 'Comité téncico' },
        { id: 'MANAGER_TEAM', name: 'Comité gerencial' },
      ],
    };

    const componentList = [
      {
        title: 'Escalas de evaluación',
        component: EvaluationScale,
        columns: columnsData(masters),
        deleteMethod: this.props.deleteEvaluationScale,
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
        masters={masters}
      />
    );
  }
}

const mapStateToProps = state => (
  {
    loading: state.evaluationScale.loading,
    data: state.evaluationScale.data,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(EvaluationScaleontainer);
