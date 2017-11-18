import React, { Component } from 'react';
import { connect } from 'react-redux';
import getDataAgreement from '../../state/Home/action';
import Home from './Home';

class HomeContainer extends Component {
  componentDidMount() {
    this.props.getDataAgreement();
  }

  render() {
    return (
      <Home />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDataAgreement: () => {
    dispatch(getDataAgreement());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(HomeContainer);
