import axios from 'axios';
import {
  GET_DATA_SURVEY_ADMON_PROGRESS,
  GET_DATA_SURVEY_ADMON_SUCCESS,
  GET_SURVEY_ADMON_SUCCESS,
  SEARCH_SURVEY_ADMON,
  CHANGE_SEARCH_SURVEY_ADMON,
  CLEAN_DATA,
  // ////////////////
  SEARCH_BY_DIMENSION,
  SET_CALL_VALUE,
  SET_SUPPLY_VALUE,
  SET_COMPANY_SIZE_VALUE,
  CHANGE_SEARCH_BY_DIMENSION,
  SEARCH_QUESTION_SURVEY,
  CHANGE_SEARCH_BY_QUESTION_SURVEY,
  GET_QUESTIONS_BY_DIMENSION,
  COLLAPSE_DIMENSION_SURVEY_FORM,
  COLLAPSE_CRITERION_SURVEY_FORM,
  GET_DIMENSIONS_SURVEY_PROGRESS,
  GET_CRITERION_SURVEY_SUCCESS,
  SAVE_CRITERION_PERCENT_SELECTED,
  SAVE_QUESTION_SELECTED,
  DIMENSION_DESELECTED,
  FILTER_BY_CRITERION_SURVEY,
  SET_DELETE_QUESTION_SURVEY,
  REQUEST_FAILED,
  SAVE_SURVEY_ADMON,
  UPDATE_DATA_SURVEY_ADMON,
} from './const';

import
{ getSurveyByIdApi, getAllDataSurveyApi, saveSurveyApi, copySurveyApi }
  from '../../api/survey';
import { getCallApi } from '../../api/call';
import { getSuppliesApi } from '../../api/supply';
import { getDataCompanySizeApi } from '../../api/companySize';
// eslint-disable-next-line no-unused-vars
import { getQuestionsByIdDimensionApi, deleteQuestionApi } from '../../api/question';
import { getDataDimensionApi } from '../../api/dimension';
import { getAllCriterionsByDimensionApi, getAllCriterionsApi } from '../../api/criterions';
import { requestApi, requestApiNotLoading } from '../../utils/action';
import getMasterApi from '../../api/master';
import setMessage from '../Generic/action';
import { openModal, closeModal } from '../Main/action';

// import Notification from '../../components/shared/notification';

// Encuesta listado
const getDataSurveyProgress = () => ({
  type: GET_DATA_SURVEY_ADMON_PROGRESS,
});

const getDataSurveySuccess = (data, call, supply, companySize, masters) => ({
  type: GET_DATA_SURVEY_ADMON_SUCCESS,
  data,
  call,
  supply,
  companySize,
  masters,
});

const updateDataSurvey = data => ({
  type: UPDATE_DATA_SURVEY_ADMON,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getAllSurveys = () => (dispatch) => {
  requestApi(dispatch, getDataSurveyProgress, getMasterApi, ['Call'])
    .then((masterResponse) => {
      requestApi(dispatch, getDataSurveyProgress, getCallApi)
        .then((callResponse) => {
          const call = callResponse.data.data;
          requestApi(dispatch, getDataSurveyProgress, getSuppliesApi)
            .then((supplyResponse) => {
              const supply = supplyResponse.data.data;
              requestApi(dispatch, getDataSurveyProgress, getDataCompanySizeApi)
                .then((companySizeResponse) => {
                  const companySize = companySizeResponse.data.data;
                  requestApi(dispatch, getDataSurveyProgress, getAllDataSurveyApi)
                    .then((response) => {
                      const { data } = response.data;
                      const dataFilter = data.map(item => ({
                        ...item,
                        visible: true,
                      }));
                      const masters = masterResponse.data.data;
                      masters.Call = masters.Call.map(item => ({
                        ...item,
                        name: item.year.toString(),
                      }));
                      dispatch(
                        getDataSurveySuccess(dataFilter, call, supply, companySize, masters));
                    });
                });
            }).catch(() => {
              dispatch(getFailedRequest());
            });
        });
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

function searchSurvey(value) {
  return {
    type: SEARCH_SURVEY_ADMON,
    value,
  };
}

function changeSearchSurvey(value) {
  return {
    type: CHANGE_SEARCH_SURVEY_ADMON,
    value,
  };
}

// Fin Encuesta listado

// Form Survey

const getDimensionsProgress = () => ({
  type: GET_DIMENSIONS_SURVEY_PROGRESS,
});

const setDeleteQuestionSurvey = () => ({
  type: SET_DELETE_QUESTION_SURVEY,
});

const getAllDataSurveyFormAdmonSuccess =
(call, supply, companySize, allCriterions, allDimensions, data,
  id, callValue, supplyValue, companySizeValue, questionSelected,
  criterionsSelected, percents) => ({
  type: GET_SURVEY_ADMON_SUCCESS,
  call,
  supply,
  companySize,
  allCriterions,
  allDimensions,
  data,
  id,
  callValue,
  supplyValue,
  companySizeValue,
  questionSelected,
  criterionsSelected,
  percents,
});

const getCriterionsSuccess = (criterions, labelOptions, id, dimensionSelected) => ({
  type: GET_CRITERION_SURVEY_SUCCESS,
  criterions,
  labelOptions,
  id,
  dimensionSelected,
});

function getCriterionByDimension(id) {
  return (dispatch, getState) => {
    const dimensions = getState().surveyAdmon.allDimensions;
    const criterions = getState().surveyAdmon.criterions;
    const dimensionSelected = getState().surveyAdmon.dimensionSelected;
    requestApi(dispatch, getDimensionsProgress, getAllCriterionsByDimensionApi, id)
      .then((response) => {
        const data = response.data.data;
        const dimension = dimensions.find(d => d.id === id);
        const labelOptions = dimension ? dimension.name : '';
        criterions.push(...data);
        const dimensionExist = dimensionSelected.find(x => x === id);
        if (!dimensionExist) {
          dimensionSelected.push(id);
        }
        dispatch(getCriterionsSuccess(criterions, labelOptions, id, dimensionSelected));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

const dimensionDeselected = (data, dimensionSelected, criterions) => ({
  type: DIMENSION_DESELECTED,
  data,
  dimensionSelected,
  criterions,
});

function dropCriterionByDimension(id) {
  return (dispatch, getState) => {
    const rCriterions = getState().surveyAdmon.criterions;
    let criterions = Object.assign([], rCriterions);
    const allCriterions = getState().surveyAdmon.allCriterions;
    const rDimensionSelected = getState().surveyAdmon.dimensionSelected;
    const dimensionSelected = Object.assign([], rDimensionSelected);
    const data = getState().surveyAdmon.data;
    let copyData = Object.assign([], data);
    dimensionSelected.splice(dimensionSelected.findIndex(x => x.id === id), 1);
    copyData = copyData.map((item) => {
      let visible = true;
      dimensionSelected.forEach((dimension) => {
        if (dimension !== '' && dimension !== item.id) {
          visible = false;
        }
      });
      return {
        ...item,
        visible,
      };
    });
    criterions = [];
    if (dimensionSelected.length > 0) {
      criterions = allCriterions.filter(x => x.idDimension === id);
    }
    dispatch(dimensionDeselected(copyData, dimensionSelected, criterions));
  };
}

const filterByCriterionSuccess = (data, criterionSelected) => ({
  type: FILTER_BY_CRITERION_SURVEY,
  data,
  criterionSelected,
});

function filterByCriterion(id) {
  return (dispatch, getState) => {
    const data = getState().surveyAdmon.data;
    const copyData = Object.assign([], data);
    const allCriterions = getState().surveyAdmon.allCriterions;
    const criterionSelected = getState().surveyAdmon.criterionSelected;
    const criterionExist = criterionSelected.find(x => x === id);
    const criterion = allCriterions.find(x => x.id === id);
    if (!criterionExist) {
      criterionSelected.push(id);
    }
    const dimension = copyData.find(x => x.id === criterion.idDimension);
    let questionExist = dimension;
    if (questionExist.data !== undefined) {
      questionExist = questionExist.data
        .map((item) => {
          let visible = false;
          criterionSelected.forEach((question) => {
            if (question !== '' && question === item.idCriterion) {
              visible = true;
            }
          });
          return {
            ...item,
            visible,
          };
        });
      copyData.find(x => x.id === dimension.id).data = questionExist;
      dispatch(filterByCriterionSuccess(copyData, criterionSelected));
    }
  };
}

function deselectedByCriterion(id) {
  return (dispatch, getState) => {
    const data = getState().surveyAdmon.data;
    const copyData = Object.assign([], data);
    const allCriterions = getState().surveyAdmon.allCriterions;
    const criterion = allCriterions.find(x => x.id === id);
    const dimension = copyData.find(x => x.id === criterion.idDimension);
    let questionExist = dimension.data;
    const rcriterionSelected = getState().surveyAdmon.criterionSelected;
    const criterionSelected = Object.assign([], rcriterionSelected);
    criterionSelected.splice(criterionSelected.findIndex(x => x.id === id), 1);
    questionExist = questionExist
      .map((item) => {
        let visible = true;
        criterionSelected.forEach((question) => {
          if (question !== '' && question !== item.idCriterion) {
            visible = false;
          }
        });
        return {
          ...item,
          visible,
        };
      });
    copyData.find(x => x.id === dimension.id).data = questionExist;
    dispatch(filterByCriterionSuccess(copyData, criterionSelected));
  };
}

function classifyQuestions(allDimensions, allCriterions, questions) {
  questions.forEach((question) => {
    const criterion = allCriterions.find(element => element.id === question.idCriterion);
    if (criterion.data) {
      criterion.data.push(question);
    } else {
      criterion.data = [question];
    }
    const dimension = allDimensions.find(element => element.id === question.idDimension);
    if (dimension.data) {
      const criteria = dimension.data.find(element => element.id === question.idCriterion);
      if (criteria) {
        criteria.data.push(question);
      } else {
        dimension.data.push(JSON.parse(JSON.stringify(criterion)));
      }
    } else {
      dimension.data = [JSON.parse(JSON.stringify(criterion))];
    }
  });
  return JSON.parse(JSON.stringify(allDimensions));
}

function classifyDimensionAndCriterion(allDimensions, allCriterions, criterionsPercent) {
  if (criterionsPercent.length > 0) {
    let dDimension = [];
    criterionsPercent.forEach((percentCriterion) => {
      dDimension = [];
      if (percentCriterion.idDimension) {
        dDimension = allDimensions.find(element => element.id === percentCriterion.idDimension);
        if (dDimension.data) {
          dDimension.data.forEach((criterion) => {
            const c = criterionsPercent.find(element => element.idCriterion === criterion.id);
            delete criterion.data;
            criterion.percent = c ? c.percent : 0;
          });
        }
        dDimension.expandable = false;
        dDimension.percent = percentCriterion.percent;
      }
    });
    return JSON.parse(JSON.stringify(allDimensions));
  }

  allDimensions.forEach((dimension) => {
    if (dimension.data) {
      dimension.data.forEach((criterion) => {
        delete criterion.data;
        criterion.visible = true;
        criterion.percent = 0;
      });
      dimension.expandable = false;
      dimension.percent = 0;
    }
  });
  return JSON.parse(JSON.stringify(allDimensions));
}

function getAllDataSurveyFormAdmon(idSurvey = '') {
  return (dispatch) => {
    let promises = [
      getCallApi(),
      getSuppliesApi(),
      getDataCompanySizeApi(),
      getAllCriterionsApi(),
      getDataDimensionApi(),
    ];
    if (idSurvey) {
      promises.push(getSurveyByIdApi(idSurvey));
    }
    requestApi(dispatch, getDataSurveyProgress, axios.all, promises).then((arrayResponse) => {
      let call = arrayResponse[0].data.data;
      call = call.map(item => ({
        ...item,
        name: item.year.toString(),
      }));
      const supply = arrayResponse[1].data.data;
      const companySize = arrayResponse[2].data.data;
      const allCriterions = arrayResponse[3].data.data;
      const allDimensions = arrayResponse[4].data.data.map(
        dimension => ({ ...dimension, visible: true, expandable: true, data: [] }),
      );

      promises = [];
      const dataFilter = allDimensions.map((item) => {
        promises.push(getQuestionsByIdDimensionApi(item.id));
        return ({ ...item, expandable: false });
      });

      let id = '';
      let callValue = '';
      let supplyValue = '';
      let companySizeValue = '';
      let questionSelected = [];
      let criterionsSelected = [];
      let surveyQuestions = [];
      let surveyCriterionsPercent = [];
      const percents = {};
      if (idSurvey) {
        const surveyData = arrayResponse[5].data.data;
        id = surveyData.id;
        callValue = surveyData.idCall;
        supplyValue = surveyData.idSupply;
        companySizeValue = surveyData.idCompanySize;
        surveyQuestions = surveyData.question.map(question => ({
          ...question,
          visible: true,
          expandable: false,
        }));
        surveyCriterionsPercent = surveyData.criterionPercent.map(percent => ({
          ...percent,
          visible: true,
          expandable: false,
        }));
        questionSelected = classifyQuestions(allDimensions, allCriterions, surveyQuestions);
        const allDimensionsB = [...allDimensions];
        // criterionsSelected = classifyDimensionAndCriterion(allDimensionsB);
        criterionsSelected =
          classifyDimensionAndCriterion(allDimensionsB, allCriterions, surveyCriterionsPercent);

        surveyCriterionsPercent.forEach((d) => {
          if (d.idDimension) {
            percents[d.idDimension] = d.percent;
          }
          if (d.idCriterion) {
            percents[d.idCriterion] = d.percent;
          }
        });
      }

      return requestApiNotLoading(dispatch, axios.all, promises).then((responses) => {
        responses.forEach((response, index) => {
          const { data } = response.data;
          const questionsByDimension = [];
          data.forEach((question) => {
            if (!surveyQuestions.find(element => element.id === question.id)) {
              questionsByDimension.push({
                ...question,
                visible: true,
                expandable: false,
              });
            }
          });
          dataFilter[index].data = JSON.parse(JSON.stringify(questionsByDimension));
        });

        dispatch(getAllDataSurveyFormAdmonSuccess(
          call, supply, companySize, allCriterions, allDimensions, dataFilter,
          id, callValue, supplyValue, companySizeValue, questionSelected,
          criterionsSelected, percents));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
  };
}

const getQuestionsByDimensionSuccess = (data, id) => ({
  type: GET_QUESTIONS_BY_DIMENSION,
  data,
  id,
});

const getQuestionsByDimension = id => (dispatch) => {
  requestApi(dispatch, getDataSurveyProgress, getQuestionsByIdDimensionApi, id)
    .then((response) => {
      const { data } = response.data;
      const dataFilter = data.map(item => ({ ...item, visible: true }));
      dispatch(getQuestionsByDimensionSuccess(dataFilter, id));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

function changeSearchByDimension(value) {
  return {
    type: CHANGE_SEARCH_BY_DIMENSION,
    value,
  };
}

function changeSearchByQuestion(value, parentId) {
  return {
    type: CHANGE_SEARCH_BY_QUESTION_SURVEY,
    value,
    parentId,
  };
}

const searchByDimension = value => ({
  type: SEARCH_BY_DIMENSION,
  value,
});

const searchQuestion = (value, parentId) => ({
  type: SEARCH_QUESTION_SURVEY,
  value,
  parentId,
});

function collapseDimension(data) {
  return {
    type: COLLAPSE_DIMENSION_SURVEY_FORM,
    data,
  };
}

function collapseCriterion(data) {
  return {
    type: COLLAPSE_CRITERION_SURVEY_FORM,
    data,
  };
}

const setCallValue = value => ({
  type: SET_CALL_VALUE,
  value,
});

const setSupplyValue = value => ({
  type: SET_SUPPLY_VALUE,
  value,
});

const setCompanySizeValue = value => ({
  type: SET_COMPANY_SIZE_VALUE,
  value,
});

function saveDataSurvey() {
  return {
    type: SAVE_SURVEY_ADMON,
  };
}

function getObjectCriterionPercent(data, idSurvey, idCall, type) {
  const criterionData = {
    idCall,
    idSurvey,
    idDimension: type === 'D' ? data.id : '',
    idCriterion: type === 'C' ? data.id : '',
    percent: data.percent,
  };

  return criterionData;
}

function saveSurvey(next, redirect) {
  return (dispatch, getState) => {
    const surveyAdmon = getState().surveyAdmon;
    const id = surveyAdmon.id;
    const idCall = surveyAdmon.callValue;
    if (idCall === '') {
      dispatch(setMessage('Debe seleccionar una convocatoria', 'warning'));
      return;
    }
    const idSupply = surveyAdmon.supplyValue;
    if (idSupply === '') {
      dispatch(setMessage('Debe seleccionar un tipo de suministro', 'warning'));
      return;
    }
    const idCompanySize = surveyAdmon.companySizeValue;
    if (idCompanySize === '') {
      dispatch(setMessage('Debe seleccionar un tamaño de empresa', 'warning'));
      return;
    }
    if (surveyAdmon.questionSelected.length === 0) {
      dispatch(setMessage('Debe seleccionar al menos una pregunta', 'warning'));
      return;
    }
    const data = {
      id,
      idCall,
      idSupply,
      idCompanySize,
      question: [],
      criterionPercent: [],
    };
    surveyAdmon.questionSelected.forEach((dimension) => {
      dimension.data.forEach((criterion) => {
        criterion.data.forEach((question) => {
          question.idCall = idCall;
          data.question.push(question);
        });
      });
    });

    surveyAdmon.criterionsSelected.forEach((dimension) => {
      data.criterionPercent.push(getObjectCriterionPercent(dimension, id, idCall, 'D'));
      dimension.data.forEach((criterion) => {
        data.criterionPercent.push(getObjectCriterionPercent(criterion, id, idCall, 'C'));
      });
    });

    requestApi(dispatch, getDataSurveyProgress, saveSurveyApi, data)
      .then(() => {
        dispatch(saveDataSurvey());
        if (next && redirect) {
          redirect();
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

const cleanData = () => ({
  type: CLEAN_DATA,
});

const questionSelectedSuccess = (questionSel, data) => ({
  type: SAVE_QUESTION_SELECTED,
  questionSel,
  data,
});

const criterionsPercentSelectedSuccess = (criterionPercentSel, percents) => ({
  type: SAVE_CRITERION_PERCENT_SELECTED,
  criterionPercentSel,
  percents,
});

function savePercentDimensionCriterion(clientData) {
  return (dispatch, getState) => {
    clientData.name = clientData.name.trim();
    const rCriterionSelected = getState().surveyAdmon.criterionsSelected;
    const criterionSelected = Object.assign([], rCriterionSelected);
    const rPercents = getState().surveyAdmon.percents;
    const percents = Object.assign({}, rPercents);
    criterionSelected.forEach((d) => {
      if (d.id === clientData.id) {
        d.percent = clientData.percent;
        percents[clientData.id] = clientData.percent;
      } else {
        d.data.forEach((element) => {
          if (element.id === clientData.id) {
            element.percent = clientData.percent;
            percents[clientData.id] = clientData.percent;
          }
        });
      }
    });
    dispatch(closeModal());
    dispatch(criterionsPercentSelectedSuccess(criterionSelected, percents));
  };
}

const crearPreguntas = (questionData, data, preguntaCriterio) => {
  if (preguntaCriterio) {
    data.find(x => x.id === questionData.idDimension).data
      .find(x => x.id === questionData.idCriterion).data
      .push(questionData);
    return data;
  }
  data.find(x => x.id === questionData.idDimension).data
    .find(x => x.id === 0).data
    .push(questionData);
  return data;
};

const validarCriterios = (questionData, data, criterion, questionCriterion) => {
  const createCriterion = data.find(x => x.id === questionData.idDimension).data;
  if (!questionCriterion) {
    const existCriterion = createCriterion.find(x => x.id === questionData.idCriterion);
    if (createCriterion.length === 0 || !existCriterion) {
      criterion.data = [];
      createCriterion.push(criterion);
    }
    return crearPreguntas(questionData, data, true);
  }
  const existCriterion = createCriterion.find(x => x.id === 0);
  if (createCriterion.length === 0 || !existCriterion) {
    createCriterion.push({ id: 0, data: [], name: 'Preguntas sin criterio' });
  }
  return crearPreguntas(questionData, data, false);
};

const validaciones = (questionData, data, criterion) => {
  const questionCriterion = questionData.idCriterion === '';
  return validarCriterios(questionData, data, criterion, questionCriterion);
};

const setDataCriterionPercent = (dQuestionSel, percents) => {
  const copyDataQ = JSON.parse(dQuestionSel);
  copyDataQ.forEach((qu) => {
    if (qu.data.length > 0) {
      qu.data.forEach((elemento) => {
        delete elemento.data;
        elemento.percent =
          Object.prototype.hasOwnProperty.call(percents, elemento.id) ? percents[elemento.id] : 0;
      });
    }
    qu.expandable = false;
    qu.percent =
      Object.prototype.hasOwnProperty.call(percents, qu.id) ? percents[qu.id] : 0;
  });

  return JSON.parse(JSON.stringify(copyDataQ));
};

const questionSelected = (questionData, type = 'selected', dependency) => (dispatch, getState) => {
  try {
    const dimensions = getState().surveyAdmon.allDimensions;
    const criterions = getState().surveyAdmon.allCriterions;
    const questionSel = getState().surveyAdmon.questionSelected;
    const criterionsSel = getState().surveyAdmon.criterionsSelected;
    const data = getState().surveyAdmon.data;
    const rPercents = getState().surveyAdmon.percents;
    const percents = Object.assign({}, rPercents);
    const copyData = Object.assign([], data);
    let dataQuestionSel = Object.assign([], questionSel);
    let dataCriterionsSel = Object.assign([], criterionsSel);
    const dimension = dimensions.find(d => d.id === questionData.idDimension);
    const criterion = criterions.find(c => c.id === questionData.idCriterion);

    if (type === 'selected' || type === 'deleteQuestion') {
      const dimensionExist = dataQuestionSel.filter(element => element.id === dimension.id);
      // Si la dimension no existe
      if (dimensionExist.length === 0) {
        dimension.data = [];
        dimension.expandable = true;
        dataQuestionSel.push(dimension);
        dataQuestionSel = validaciones(questionData, dataQuestionSel, criterion);
        // Si la dimension ya existe
      } else {
        dataQuestionSel = validaciones(questionData, dataQuestionSel, criterion);
      }

      // eliminar la pregunta seleccionada
      const indexQuestion = copyData.find(x => x.id === questionData.idDimension).data
        .findIndex(x => x.id === questionData.id);
      copyData.find(x => x.id === questionData.idDimension).data
        .splice(indexQuestion, 1);

      dispatch(questionSelectedSuccess(dataQuestionSel, copyData));
      dataCriterionsSel = setDataCriterionPercent(JSON.stringify(dataQuestionSel), percents);
      dispatch(criterionsPercentSelectedSuccess(dataCriterionsSel));

      const dependingQuestion = copyData.find(x => x.id === questionData.idDimension).data
        .find(x => x.id === questionData.dependOfQuestion);
      if (questionData.dependOfQuestion !== '' && dependingQuestion) {
        dispatch(questionSelected(dependingQuestion, 'selected', true));
      } else {
        let message = `Pregunta agregada exitosamente${dependency ? ', junto con la pregunta de la que depende' : ''}`;
        if (type === 'deleteQuestion') {
          message = 'La pregunta ha sido eliminada';
        }
        dispatch(setMessage(message, 'success'));
        dispatch(setDeleteQuestionSurvey());
      }
    } else {
      // Buscar dimension de la pregunta
      copyData.find(x => x.id === questionData.idDimension).data
        .push(questionData);
      // eliminar la pregunta deseleccionada
      const siblingQuestions = dataQuestionSel
        .find(x => x.id === questionData.idDimension).data
        .find(x => x.id === (questionData.idCriterion !== '' ? questionData.idCriterion : 0)).data;
      const indexQuestion = siblingQuestions.findIndex(x => x.id === questionData.id);

      dataQuestionSel
        .find(x => x.id === questionData.idDimension).data
        .find(x => x.id === (questionData.idCriterion !== '' ? questionData.idCriterion : 0)).data
        .splice(indexQuestion, 1);

      dispatch(questionSelectedSuccess(dataQuestionSel, copyData));
      dataCriterionsSel = setDataCriterionPercent(JSON.stringify(dataQuestionSel), percents);
      dispatch(criterionsPercentSelectedSuccess(dataCriterionsSel));

      const dependingQuestions = siblingQuestions
        .filter(x => x.dependOfQuestion === questionData.id);
      if (dependingQuestions.length > 0) {
        dependingQuestions.forEach((x) => {
          dispatch(questionSelected(x, 'deselected', true));
        });
        dispatch(setMessage('Se ha regresado la pregunta al listado, junto con las preguntas dependientes', 'success'));
      } else if (!dependency) {
        dispatch(setMessage('Se ha regresado la pregunta al listado', 'success'));
      }
    }
  } catch (error) {
    dispatch(setMessage('Ha ocurrido un error!', 'error', error));
  }
};

// eslint-disable-next-line no-unused-vars
const deleteQuestionSurveyAdmon = question => (dispatch) => {
  requestApi(dispatch, getDimensionsProgress, deleteQuestionApi, question)
    .then(() => {
      dispatch(questionSelected(question, 'deleteQuestion'));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

const copySurvey = data => (dispatch) => {
  dispatch(closeModal());
  requestApi(dispatch, getDataSurveyProgress, copySurveyApi, data)
    .then(() => {
      requestApi(dispatch, getDataSurveyProgress, getAllDataSurveyApi)
        .then((response) => {
          const dataFilter = response.data.data.map(item => ({
            ...item,
            visible: true,
          }));
          dispatch(updateDataSurvey(dataFilter));
          dispatch(setMessage('La encuesta ha sido copiada', 'success'));
        }).catch(() => {
          dispatch(getFailedRequest());
        });
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getAllSurveys,
  getAllDataSurveyFormAdmon,
  changeSearchSurvey,
  searchSurvey,
  saveSurvey as saveData,
  savePercentDimensionCriterion,
  cleanData,
  changeSearchByDimension,
  changeSearchByQuestion,
  searchByDimension,
  searchQuestion,
  getQuestionsByDimension,
  collapseDimension,
  collapseCriterion,
  getCriterionByDimension,
  dropCriterionByDimension,
  questionSelected,
  filterByCriterion,
  deselectedByCriterion,
  setCallValue,
  setSupplyValue,
  setCompanySizeValue,
  copySurvey,
  openModal,
  closeModal,
  deleteQuestionSurveyAdmon,
};
