import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../state/Question/action';
import Question from './Question';
import ColumnsQuestion from './ColumnsQuestion';

const pathQuestionForm = '/question/form';

class QuestionContainer extends Component {
  componentDidMount() {
    this.props.getAllQuestions();
  }

  onEdit = (record) => {
    const { history } = this.props;
    history.push(`${pathQuestionForm}/${record.id}`);
  }

  onAdd = () => {
    const { history } = this.props;
    history.push(`${pathQuestionForm}`);
  }

  deleteQuestion = (id) => {
    this.props.deleteQuestion(id);
  }

  render() {
    const template =
    ColumnsQuestion(this.props, this.onAdd, this.deleteQuestion, this.onEdit);
    return (
      <Question
        {...this.props}
        toForm={pathQuestionForm}
        columns={template}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.question.loading,
  data: state.question.data,
  dimension: state.question.dimension,
  criterion: state.question.criterion,
  searchValue: state.question.searchValue,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(QuestionContainer));

