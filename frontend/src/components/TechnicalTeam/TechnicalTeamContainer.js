import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/TechnicalTeam/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import TechnicalTeam from './TechnicalTeam';

class TechnicalTeamContainer extends Component {
  componentDidMount() {
    this.props.getTechnicalTeam();
  }

  render() {
    const componentList = [
      {
        title: 'Comité técnico',
        component: TechnicalTeam,
        columns: columnsData(this.props.masters),
        deleteMethod: this.props.deleteTechnicalTeam,
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
    loading: state.technicalTeam.loading,
    data: state.technicalTeam.data,
    masters: state.technicalTeam.masters,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(TechnicalTeamContainer);
