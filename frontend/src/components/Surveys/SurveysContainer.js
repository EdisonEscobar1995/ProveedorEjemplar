import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/Surveys/action';
import Filters from './Filters';
import Surveys from './Surveys';

class SurveysContainer extends Component {
  componentDidMount() {
    const year = '';
    this.props.getSurveys(year);
  }

  render() {
    return (
      <div>
        <Filters
          {...this.props}
        />
        <Surveys
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.surveys.data,
  loading: state.surveys.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(SurveysContainer);
