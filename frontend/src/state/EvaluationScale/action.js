import {
  GET_EVALUATION_SCALE_PROGRESS,
  GET_EVALUATION_SCALE_SUCCESS,
  REQUEST_FAILED,
  ADD_EVALUATION_SCALE,
  SAVE_EVALUATION_SCALE,
  DELETE_EVALUATION_SCALE,
  SEARCH_EVALUATION_SCALE,
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

function saveDataEvaluationScale(id, data, remoteId) {
  return {
    type: id ? SAVE_EVALUATION_SCALE : ADD_EVALUATION_SCALE,
    data,
    remoteId,
  };
}

function deleteDataEvaluationScale(data) {
  return {
    type: DELETE_EVALUATION_SCALE,
    data,
  };
}

function searchEvaluationScale(value) {
  return {
    type: SEARCH_EVALUATION_SCALE,
    value,
  };
}

function getEvaluationScales() {
  return (dispatch) => {
    requestApi(dispatch, getEvaluationScaleProgress, getEvaluationScalesApi)
      .then((response) => {
        const data = response.data.data.map(element => ({
          ...element,
          visible: true,
        }));
        dispatch(getEvaluationScaleSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveEvaluationScale(clientData, remoteId, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getEvaluationScaleProgress, saveEvaluationScaleApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataEvaluationScale(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteEvaluationScale(clientData) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getEvaluationScaleProgress, deleteEvaluationScaleApi, clientData)
      .then(() => {
        dispatch(deleteDataEvaluationScale(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getEvaluationScales,
  saveEvaluationScale,
  deleteEvaluationScale,
  searchEvaluationScale,
  openModal,
  closeModal,
};
