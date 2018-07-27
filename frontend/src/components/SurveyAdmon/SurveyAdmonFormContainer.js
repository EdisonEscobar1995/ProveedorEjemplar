import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Spin, Button, notification } from 'antd';
import * as SurveyAdmonAction from '../../state/SurveyAdmon/action';
import H1 from '../shared/H1';
import SubTitle from '../shared/SubTitle';
import Tab from '../shared/Tabs';
import { SurveyAdmonForm, ListQuestion, QuestionSelected } from './';

const Space = styled.div`
  margin-bottom: 20px;
`;

const ButtonStyle = styled(Button)`
  margin-right: 5px;
`;

class SurveyAdmonFormContainer extends Component {
  componentDidMount() {
    this.props.getAllDataSurveyFormAdmon();
    this.props.getDimensions();
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
    const { loading, questionSelected } = this.props;

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
  supply: state.surveyAdmon.supply,
  companySize: state.surveyAdmon.companySize,
  data: state.surveyAdmon.data,
  questionSelected: state.surveyAdmon.questionSelected,
  loading: state.surveyAdmon.loading,
});

const mapDispatchToProps = dispatch => ({
  getAllDataSurveyFormAdmon: () => {
    dispatch(SurveyAdmonAction.getAllDataSurveyFormAdmon());
  },
  getDimensions: () => {
    dispatch(SurveyAdmonAction.getDimensions());
  },
  getCriterionByDimension: (id) => {
    dispatch(SurveyAdmonAction.getCriterionByDimension(id));
  },
  saveData: (next, redirect) => {
    dispatch(SurveyAdmonAction.saveData(next, redirect));
  },
  supplyValue: (value) => {
    dispatch(SurveyAdmonAction.supplyValue(value));
  },
  companySizeValue: (value) => {
    dispatch(SurveyAdmonAction.companySizeValue(value));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurveyAdmonFormContainer));
