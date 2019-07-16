import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/TechnicalTeam/action';
import selectionPersonData from './selectionPersonData';
import GenericForm from '../shared/GenericForm';

class SelectionPerson extends Component {
  componentDidMount() {
    this.props.getTechnicalTeam();
  }

  render() {
    return (
      <GenericForm
        {...this.props}
        formData={selectionPersonData}
        submitMethod={
          (values) => {
            const { idUser } = values;
            const user = this.props.masters.User.filter(item => item.id === idUser);
            this.props.sendMethod(
              this.props.checked,
              this.props.type,
              user[0].name,
              this.props.openNotification);
          }
        }
        validate
      />
    );
  }
}

const mapStateToProps = state => ({
  masters: state.technicalTeam.masters,
});

export default connect(
  mapStateToProps,
  actions,
)(SelectionPerson);
