import {
  GET_DIMENSION_PROGRESS,
  GET_DIMENSION_SUCCESS,
  GET_CRITERION_BY_DIMENSION_SUCCESS,
  REQUEST_FAILED,
  ADD_DIMENSION,
  UPDATE_DIMENSION,
  DELETE_DIMENSION,
  ADD_CRITERION,
  UPDATE_CRITERION,
  DELETE_CRITERION,
  SEARCH_DIMENSION,
  SEARCH_CRITERION,
  CHANGE_SEARCH_DIMENSION,
  CHANGE_SEARCH_CRITERION,
  COLLAPSE_DIMENSION,
} from './const';
import {
  getDataDimensionApi, saveDataDimensionApi, deleteDataDimensionApi,
} from '../../api/dimension';
import {
  getAllCriterionsByDimensionApi, saveDataCriterionApi, deleteDataCriterionApi,
} from '../../api/criterions';
import { openModal, closeModal } from '../Main/action';
import { requestApi, sortByField } from '../../utils/action';
import blankSpaces from '../../utils/blankSpaces';

function getDimensionProgress() {
  return {
    type: GET_DIMENSION_PROGRESS,
  };
}

function getDimensionSuccess(data) {
  return {
    type: GET_DIMENSION_SUCCESS,
    data,
  };
}

function getCriterionByDimensionSuccess(data, id) {
  return {
    type: GET_CRITERION_BY_DIMENSION_SUCCESS,
    data,
    id,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataDimension(id, data, remoteId) {
  return {
    type: id ? UPDATE_DIMENSION : ADD_DIMENSION,
    data,
    remoteId,
  };
}

function saveDataCriterionSuccess(id, data, remoteId) {
  return {
    type: id ? UPDATE_CRITERION : ADD_CRITERION,
    data,
    remoteId,
  };
}

function deleteDataDimension(data) {
  return {
    type: DELETE_DIMENSION,
    data,
  };
}

function deleteDataCriterionSuccess(data) {
  return {
    type: DELETE_CRITERION,
    data,
  };
}

function searchDimension(value) {
  return {
    type: SEARCH_DIMENSION,
    value,
  };
}

function searchCriterion(value, parentId) {
  return {
    type: SEARCH_CRITERION,
    value,
    parentId,
  };
}

function changeSearchDimension(value) {
  return {
    type: CHANGE_SEARCH_DIMENSION,
    value,
  };
}

function changeSearchCriterion(value, parentId) {
  return {
    type: CHANGE_SEARCH_CRITERION,
    value,
    parentId,
  };
}

function collapseDimension(data) {
  return {
    type: COLLAPSE_DIMENSION,
    data,
  };
}

function getDimensions() {
  return (dispatch) => {
    requestApi(dispatch, getDimensionProgress, getDataDimensionApi)
      .then((response) => {
        const data = sortByField(response.data.data, 'name')
          .map(element => ({
            ...element,
            visible: true,
          }));
        dispatch(getDimensionSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function getCriterionByDimension(id) {
  return (dispatch) => {
    requestApi(dispatch, getDimensionProgress, getAllCriterionsByDimensionApi, id)
      .then((response) => {
        const data = sortByField(response.data.data, 'name')
          .map(element => ({
            ...element,
            visible: true,
          }));
        dispatch(getCriterionByDimensionSuccess(data, id));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveDimension(clientData, remoteId, next) {
  return (dispatch) => {
    if (!blankSpaces(dispatch, clientData.name)) {
      return;
    }
    clientData.name = clientData.name.trim();
    dispatch(closeModal());
    requestApi(dispatch, getDimensionProgress, saveDataDimensionApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataDimension(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveCriterion(clientData, remoteId, next) {
  return (dispatch) => {
    if (!blankSpaces(dispatch, clientData.name)) {
      return;
    }
    clientData.name = clientData.name.trim();
    dispatch(closeModal());
    requestApi(dispatch, getDimensionProgress, saveDataCriterionApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataCriterionSuccess(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteDimension(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getDimensionProgress, deleteDataDimensionApi, clientData)
      .then(() => {
        dispatch(deleteDataDimension(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteCriterion(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getDimensionProgress, deleteDataCriterionApi, clientData)
      .then(() => {
        dispatch(deleteDataCriterionSuccess(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getDimensions,
  getCriterionByDimension,
  saveDimension,
  deleteDimension,
  deleteCriterion,
  saveCriterion,
  searchDimension,
  searchCriterion,
  changeSearchDimension,
  changeSearchCriterion,
  collapseDimension,
  openModal,
  closeModal,
};
