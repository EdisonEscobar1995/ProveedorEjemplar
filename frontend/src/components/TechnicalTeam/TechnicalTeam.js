import React, { Component } from 'react';
import { connect } from 'react-redux';
import technicalTeamData from './technicalTeamData';
import GenericForm from '../shared/GenericForm';

class TechnicalTeam extends Component {
  componentDidMount() {
    const { getCategoryBySupply, record } = this.props;
    if (record) {
      getCategoryBySupply(record.idSupply);
    }
  }
  render() {
    return (
      <GenericForm
        {...this.props}
        formData={technicalTeamData}
        submitMethod={this.props.saveTechnicalTeam}
        validate
      />
    );
  }
}

const mapStateToProps = state => ({
  loadingModal: state.main.loadingModal,
  masters: state.technicalTeam.masters,
});

export default connect(mapStateToProps, null)(TechnicalTeam);
