import React from 'react';
import { connect } from 'react-redux';
import managerTeamData from './managerTeamData';
import GenericForm from '../shared/GenericForm';

function ManagerTeam(props) {
  return (
    <GenericForm
      {...props}
      formData={managerTeamData}
      submitMethod={props.saveManagerTeam}
      validate
    />
  );
}

const mapStateToProps = state => ({
  loadingModal: state.main.loadingModal,
  masters: state.managerTeam.masters,
});

export default connect(mapStateToProps, null)(ManagerTeam);
