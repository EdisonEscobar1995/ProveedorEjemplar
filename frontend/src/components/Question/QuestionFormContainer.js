import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import * as QuestionAction from '../../state/Question/action';
import QuestionForm from './QuestionForm';
import H1 from '../shared/H1';

class QuestionFormContainer extends Component {
  componentDidMount() {
    const { match: { params: { id = null } } } = this.props;
    if (id && typeof id === 'string') {
      this.props.getQuestion(id);
    } else {
      this.props.getAddQuestion();
    }
  }

  render() {
    const { loading } = this.props;
    if (loading === false) {
      return (
        <Spin spinning={loading}>
          <H1
            text="ADMINISTRAR PREGUNTAS"
          />
          <QuestionForm
            {...this.props}
          />
        </Spin>
      );
    }
    return (
      <Spin spinning={loading}>
        <H1
          text="ADMINISTRAR PREGUNTAS"
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  editData: state.question.editData,
  dimension: state.question.dimension,
  criterion: state.question.criterion,
  questions: state.question.questions,
  items: state.question.items,
  options: state.question.options,
  loading: state.question.loading,
});

const mapDispatchToProps = {
  ...QuestionAction,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionFormContainer));
