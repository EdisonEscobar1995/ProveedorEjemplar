import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Dictionary from './Dictionary';
import H1 from '../shared/H1';
import * as actions from '../../state/Dictionary/action';

class NotificationContainer extends Component {
  componentDidMount() {
    this.props.getDictionary();
  }
  render() {
    return (
      <Spin spinning={this.props.loading}>
        <H1
          text="ADMINISTRAR DICCIONARIO"
        />
        <Dictionary {...this.props} />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.dictionary.loading,
  data: state.dictionary.data,
  masters: state.dictionary.masters,
  fields: state.dictionary.fields,
  spanishText: state.dictionary.spanishText,
  translate: state.dictionary.translate,
});

export default connect(
  mapStateToProps,
  actions,
)(NotificationContainer);
