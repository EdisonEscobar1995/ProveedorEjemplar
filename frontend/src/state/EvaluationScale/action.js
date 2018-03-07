import {
  GET_EVALUATION_SCALE_PROGRESS,
  GET_EVALUATION_SCALE_SUCCESS,
  REQUEST_FAILED,
  ADD_EVALUATION_SCALE,
  SAVE_EVALUATION_SCALE,
  DELETE_EVALUATION_SCALE,
} from './const';
import { getEvaluationScalesApi, saveEvaluationScaleApi, deleteEvaluationScaleApi } from '../../api/evaluationScale';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

function getEvaluationScaleProgress() {
  return {
    type: GET_EVALUATION_SCALE_PROGRESS,
  };
}

function getEvaluationScaleSuccess(data) {
  return {
    type: GET_EVALUATION_SCALE_SUCCESS,
    data,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataEvaluationScale(data, index, id) {
  return {
    type: id ? SAVE_EVALUATION_SCALE : ADD_EVALUATION_SCALE,
    data,
    index,
  };
}

function deleteDataEvaluationScale(index) {
  return {
    type: DELETE_EVALUATION_SCALE,
    index,
  };
}

function getEvaluationScales() {
  return (dispatch) => {
    requestApi(dispatch, getEvaluationScaleProgress, getEvaluationScalesApi)
      .then((response) => {
        const { data } = response.data;
        dispatch(getEvaluationScaleSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveEvaluationScale(clientData, index, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getEvaluationScaleProgress, saveEvaluationScaleApi, clientData)
      .then((response) => {
        const { data } = response.data;
        dispatch(saveDataEvaluationScale(data, index, clientData.id));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteEvaluationScale(clientData, index) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getEvaluationScaleProgress, deleteEvaluationScaleApi, clientData)
      .then(() => {
        dispatch(deleteDataEvaluationScale(index));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getEvaluationScales,
  saveEvaluationScale,
  deleteEvaluationScale,
  openModal,
  closeModal,
};
