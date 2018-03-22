import React, { Component } from 'react';
import { connect } from 'react-redux';
import userData from './userData';
import GenericForm from '../shared/GenericForm';

class User extends Component {
  componentDidMount() {
    this.props.editUser();
  }

  render() {
    return (
      <GenericForm
        {...this.props}
        formData={userData}
        submitMethod={this.props.saveUser}
        validate
      />
    );
  }
}

const mapStateToProps = state => ({
  masters: state.user.masters,
  fetching: state.user.fetching,
});

export default connect(mapStateToProps, null)(User);
