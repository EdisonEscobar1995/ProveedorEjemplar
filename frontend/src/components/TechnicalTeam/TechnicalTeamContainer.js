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
        onChangeSearchMethod: this.props.changeSearchTechnicalTeam,
        onSearchMethod: this.props.searchTechnicalTeam,
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
    data: state.technicalTeam.data,
    searchValue: state.technicalTeam.searchValue,
    masters: state.technicalTeam.masters,
    loading: state.technicalTeam.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(TechnicalTeamContainer);
