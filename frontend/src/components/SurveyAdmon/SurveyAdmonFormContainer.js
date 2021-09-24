import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Spin, Button, notification } from 'antd';
import * as SurveyAdmonAction from '../../state/SurveyAdmon/action';
import H1 from '../shared/H1';
import SubTitle from '../shared/SubTitle';
import Tab from '../shared/Tabs';
import { SurveyAdmonForm, ListQuestion, QuestionSelected, PercentSelected } from './';

const Space = styled.div`
  margin-bottom: 20px;
`;

const ButtonStyle = styled(Button)`
  margin-right: 5px;
`;

class SurveyAdmonFormContainer extends Component {
  componentDidMount() {
    const { match: { params: { id = null } } } = this.props;
    this.props.getAllDataSurveyFormAdmon(id);
  }

  redirectToList = () => {
    const { history } = this.props;
    const pathSurveyAdmon = '/surveyAdmon';
    history.push(pathSurveyAdmon);
  }

  saveData = () => {
    this.props.saveData(this.openNotification, this.redirectToList);
  }

  openNotification = () => {
    notification.success({
      message: 'Operación exitosa',
      description: 'Documento guardado',
    });
  };

  render() {
    const { loading, questionSelected, criterionsSelected } = this.props;

    const dataTabs = [
      {
        index: 1,
        text: 'Listado de preguntas',
        component: <ListQuestion {...this.props} />,
      },
      {
        index: 2,
        text: 'Preguntas seleccionadas',
        component: <QuestionSelected data={questionSelected} />,
      },
      {
        index: 3,
        text: 'Porcentajes dimensiones y criterios',
        component: <PercentSelected data={criterionsSelected} />,
      },
    ];

    return (
      <Spin spinning={loading}>
        <H1
          text="ADMINISTRAR ENCUESTA"
        />
        <SurveyAdmonForm
          {...this.props}
        />
        <Space />
        <SubTitle text="Preguntas" />
        <Tab dataTabs={dataTabs} />
        <ButtonStyle type="primary" onClick={this.saveData}>Guardar</ButtonStyle>
        <Button type="secondary" onClick={this.redirectToList}>Cancelar</Button>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  call: state.surveyAdmon.call,
  supply: state.surveyAdmon.supply,
  companySize: state.surveyAdmon.companySize,
  callValue: state.surveyAdmon.callValue,
  supplyValue: state.surveyAdmon.supplyValue,
  companySizeValue: state.surveyAdmon.companySizeValue,
  data: state.surveyAdmon.data,
  questionSelected: state.surveyAdmon.questionSelected,
  deleteQuestionSurveyAdmon: state.surveyAdmon.deleteQuestionSurveyAdmon,
  criterionsSelected: state.surveyAdmon.criterionsSelected,
  loading: state.surveyAdmon.loading,
});

const mapDispatchToProps = dispatch => ({
  getAllDataSurveyFormAdmon: (id) => {
    dispatch(SurveyAdmonAction.getAllDataSurveyFormAdmon(id));
  },
  getCriterionByDimension: (id) => {
    dispatch(SurveyAdmonAction.getCriterionByDimension(id));
  },
  saveData: (next, redirect) => {
    dispatch(SurveyAdmonAction.saveData(next, redirect));
  },
  setCallValue: (value) => {
    dispatch(SurveyAdmonAction.setCallValue(value));
  },
  setSupplyValue: (value) => {
    dispatch(SurveyAdmonAction.setSupplyValue(value));
  },
  setCompanySizeValue: (value) => {
    dispatch(SurveyAdmonAction.setCompanySizeValue(value));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurveyAdmonFormContainer));
