import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/ManagerTeam/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import ManagerTeam from './ManagerTeam';

class ManagerTeamContainer extends Component {
  componentDidMount() {
    this.props.getManagerTeam();
  }

  render() {
    const componentList = [
      {
        title: 'Comité gerencial',
        component: ManagerTeam,
        columns: columnsData(this.props.masters),
        deleteMethod: this.props.deleteManagerTeam,
        onChangeSearchMethod: this.props.changeSearchManagerTeam,
        onSearchMethod: this.props.searchManagerTeam,
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
    data: state.managerTeam.data,
    searchValue: state.managerTeam.searchValue,
    masters: state.managerTeam.masters,
    loading: state.managerTeam.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(ManagerTeamContainer);
