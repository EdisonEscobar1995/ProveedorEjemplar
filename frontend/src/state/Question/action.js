import axios from 'axios';
import {
  GET_DATA_QUESTION_PROGRESS,
  GET_DATA_QUESTION_SUCCESS,
  GET_QUESTION_PROGRESS,
  GET_QUESTION_SUCCESS,
  SEARCH_QUESTION,
  CHANGE_SEARCH_QUESTION,
  CHANGE_DIMENSION,
  CHANGE_CRITERION,
  CHANGE_HELP_TEXT,
  CHANGE_QUESTION,
  UPDATE_OPTIONS,
  SAVE_QUESTION,
  SAVE_DATA_OPTION,
  DELETE_QUESTION,
  REQUEST_FAILED,
  CLEAR_EDIT,
  CHANGE_DISABLED,
  CHANGE_ITEMS,
  GET_OPTIONS_BY_QUESTION,
  GET_ADD_QUESTION,
  CHANGE_ANSWER_TYPE,
  CHANGE_DEPENDING_QUESTION,
  SWITCH_REQUIRED,
  SWITCH_REQUIRED_ATTACHMENT,
} from './const';

import
{ getAllDataQuestionApi, getQuestionByIdApi, saveQuestionApi, deleteQuestionApi }
  from '../../api/question';
import { getDataDimensionApi } from '../../api/dimension';
import { getAllCriterionsApi } from '../../api/criterions';
import { getOptionByQuestionApi, saveOptionsApi } from '../../api/option';
import { requestApi, sortByField } from '../../utils/action';
import setMessage from '../Generic/action';

const getDataQuestionProgress = () => ({
  type: GET_DATA_QUESTION_PROGRESS,
});

const getDataQuestionSuccess = (data, dimension, criterion) => ({
  type: GET_DATA_QUESTION_SUCCESS,
  data,
  dimension,
  criterion,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getAllQuestions = () => (dispatch) => {
  requestApi(dispatch, getDataQuestionProgress, getDataDimensionApi)
    .then((dimensionResponse) => {
      const dimension = dimensionResponse.data;
      requestApi(dispatch, getDataQuestionProgress, getAllCriterionsApi)
        .then((criterionResponse) => {
          const criterion = criterionResponse.data;
          requestApi(dispatch, getDataQuestionProgress, getAllDataQuestionApi)
            .then((response) => {
              const { data } = response.data;
              let dataFilter = data.map((item) => {
                const oDimensionName = dimension.data.find(x => x.id === item.idDimension);
                let dimensionName = '';
                if (oDimensionName) {
                  dimensionName = oDimensionName.name;
                }
                const oCriterionName = criterion.data.find(x => x.id === item.idCriterion);
                let criterionName = '';
                if (oCriterionName) {
                  criterionName = oCriterionName.name;
                }
                return {
                  ...item,
                  visible: true,
                  dimensionName,
                  criterionName,
                };
              });
              dataFilter = sortByField(dataFilter, 'dimensionName');
              dispatch(getDataQuestionSuccess(dataFilter, dimension, criterion));
            }).catch(() => {
              dispatch(getFailedRequest());
            });
        }).catch(() => {
          dispatch(getFailedRequest());
        });
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const getQuestionProgress = () => ({
  type: GET_QUESTION_PROGRESS,
});

const getQuestionSuccess = (editData, dimension, criterion, questions, options, items) => ({
  type: GET_QUESTION_SUCCESS,
  editData,
  dimension,
  criterion,
  questions,
  options,
  items,
});

const getOptionByQuestionSuccess = items => ({
  type: GET_OPTIONS_BY_QUESTION,
  items,
});

const clearDataEdit = () => ({
  type: CLEAR_EDIT,
});

const getAddQuestionSuccess = (dimension, criterion, questions) => ({
  type: GET_ADD_QUESTION,
  dimension,
  criterion,
  questions,
});

const getAddQuestion = () => (dispatch) => {
  const promises = [
    getDataDimensionApi(),
    getAllCriterionsApi(),
    getAllDataQuestionApi(),
  ];
  requestApi(dispatch, getDataQuestionProgress, axios.all, promises).then((arrayResponse) => {
    const dimension = arrayResponse[0].data.data;
    const criterion = arrayResponse[1].data.data;
    const dataQuestions = arrayResponse[2].data.data;
    const questions =
      dataQuestions
        .map(data => ({
          ...data,
          name: data.wording,
        }));
    dispatch(getAddQuestionSuccess(dimension, criterion, questions));
  }).catch((err) => {
    dispatch(getFailedRequest(err));
  });
};

const changeDependingQuestionSuccess = dependOfQuestion => ({
  type: CHANGE_DEPENDING_QUESTION,
  dependOfQuestion,
});

const changeDependingQuestion = id => (dispatch) => {
  requestApi(dispatch, getDataQuestionProgress, getOptionByQuestionApi, id)
    .then((response) => {
      const options = response.data.data;
      const items = options.map(item => ({
        ...item,
        name: item.wording,
      }));
      dispatch(getOptionByQuestionSuccess(items));
      dispatch(changeDependingQuestionSuccess(id));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

function getQuestion(id) {
  return (dispatch) => {
    const promises = [
      getDataDimensionApi(),
      getAllCriterionsApi(),
      getQuestionByIdApi(id),
      getAllDataQuestionApi(),
      getOptionByQuestionApi(id),
    ];
    requestApi(dispatch, getDataQuestionProgress, axios.all, promises).then((arrayResponse) => {
      const dimension = arrayResponse[0].data.data;
      const criterion = arrayResponse[1].data.data;
      const dataEdit = arrayResponse[2].data.data;
      const dataQuestions = arrayResponse[3].data.data;
      let options = arrayResponse[4].data.data;
      options = options
        .map(data => ({
          ...data,
          key: data.id,
        }));
      const questions =
        dataQuestions
          .filter(q => q.id !== dataEdit.id)
          .map(data => ({
            ...data,
            name: data.wording,
          }));
      requestApi(
        dispatch, getDataQuestionProgress, getOptionByQuestionApi, dataEdit.dependOfQuestion,
      )
        .then((responseItems) => {
          const itemsData = responseItems.data.data;
          const items = itemsData.map(item => ({
            ...item,
            name: item.wording,
          }));
          dispatch(getQuestionSuccess(dataEdit, dimension, criterion, questions, options, items));
        }).catch(() => {
          dispatch(getFailedRequest());
        });
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
  };
}

function searchQuestion(value) {
  return {
    type: SEARCH_QUESTION,
    value,
  };
}

function changeSearchQuestion(value) {
  return {
    type: CHANGE_SEARCH_QUESTION,
    value,
  };
}

function changeDisabled() {
  return {
    type: CHANGE_DISABLED,
  };
}

function changeItems(e) {
  return {
    type: CHANGE_ITEMS,
    value: e.target.value,
  };
}

function saveDataQuestion(data) {
  return {
    type: SAVE_QUESTION,
    data,
  };
}

const saveDataOptionSuccess = () => ({
  type: SAVE_DATA_OPTION,
});

const deleteQuestionSuccess = () => ({
  type: DELETE_QUESTION,
});

const deleteQuestion = id => (dispatch) => {
  requestApi(dispatch, getDataQuestionProgress, deleteQuestionApi, id)
    .then(() => {
      dispatch(deleteQuestionSuccess());
      dispatch(setMessage('La pregunta ha sido eliminada', 'success'));
      dispatch(getAllQuestions());
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

function saveOptionsQuestion(element) {
  return (dispatch) => {
    requestApi(dispatch, getQuestionProgress, saveOptionsApi, element)
      .then(() => {
        dispatch(saveDataOptionSuccess());
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveQuestion(clientData, next) {
  return (dispatch, getState) => {
    clientData.idSurvey = getState().question.editData.idSurvey;
    // clientData.idSurvey = [];
    requestApi(dispatch, getQuestionProgress, saveQuestionApi, clientData)
      .then((response) => {
        const { data } = response.data;
        dispatch(saveDataQuestion(data));
      }).then(() => {
        if (clientData.type === 'Cerrada') {
          const dataOptions = getState().question.options;
          const emptyData = dataOptions.filter(x => x.wording === '');
          if (emptyData.length > 0) {
            dispatch(setMessage('Las opciones de respuesta son obligatorias.', 'warning'));
            return;
          }
          if (emptyData.length === 0) {
            dataOptions.forEach((element) => {
              dispatch(saveOptionsQuestion(element));
            });
          }
        }
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

const changeAnswerType = answerType => ({
  type: CHANGE_ANSWER_TYPE,
  answerType,
});

const changeDimension = value => ({
  type: CHANGE_DIMENSION,
  value,
});

const changeCriterion = value => ({
  type: CHANGE_CRITERION,
  value,
});

const changeQuestion = value => ({
  type: CHANGE_QUESTION,
  value,
});

const changeHelpText = value => ({
  type: CHANGE_HELP_TEXT,
  value,
});

const switchRequired = checked => ({
  type: SWITCH_REQUIRED,
  checked,
});

const switchRequiredAttachment = checked => ({
  type: SWITCH_REQUIRED_ATTACHMENT,
  checked,
});

const updateDataOptionsSuccess = options => ({
  type: UPDATE_OPTIONS,
  options,
});

const addDataOptions = value => (dispatch, getstate) => {
  const { options, editData } = getstate().question;
  const valueOption = {
    ...value,
    id: '',
    idQuestion: editData.id,
  };
  options.push(valueOption);
  dispatch(updateDataOptionsSuccess(options));
};

const updateDataOptions = (value, index, key) => (dispatch, getstate) => {
  const { options, editData } = getstate().question;
  if (index >= options.length) {
    const valueOption = {
      wording: key === 'wording' ? value : '',
      score: key === 'score' ? value : '',
      key: index,
      id: '',
      idQuestion: editData.id,
    };
    options.push(valueOption);
  } else {
    options[index][key] = value;
  }
  dispatch(updateDataOptionsSuccess(options));
};

const deleteDataOptions = data => (dispatch) => {
  dispatch(updateDataOptionsSuccess(data));
};

export {
  getAllQuestions,
  getQuestion,
  clearDataEdit,
  changeSearchQuestion,
  searchQuestion,
  saveQuestion as saveData,
  changeDisabled,
  deleteQuestion,
  addDataOptions,
  changeDependingQuestion,
  changeDimension,
  changeCriterion,
  changeQuestion,
  changeHelpText,
  getAddQuestion,
  changeAnswerType,
  changeItems,
  switchRequired,
  switchRequiredAttachment,
  updateDataOptions,
  deleteDataOptions,
  saveOptionsQuestion,
};
