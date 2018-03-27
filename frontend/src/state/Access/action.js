import {
  GET_ACCESS_PROGRESS,
  GET_ACCESS_SUCCESS,
  REQUEST_FAILED,
  ADD_ACCESS,
  UPDATE_ACCESS,
  DELETE_ACCESS,
  SEARCH_ACCESS,
  CHANGE_SEARCH_ACCESS,
} from './const';
import { getAccessesApi, saveAccessApi, deleteAccessApi } from '../../api/access';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

function getAccessProgress() {
  return {
    type: GET_ACCESS_PROGRESS,
  };
}

function getAccessSuccess(data) {
  return {
    type: GET_ACCESS_SUCCESS,
    data,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataAccess(id, data, remoteId) {
  return {
    type: id ? UPDATE_ACCESS : ADD_ACCESS,
    data,
    remoteId,
  };
}

function deleteDataAccess(data) {
  return {
    type: DELETE_ACCESS,
    data,
  };
}

function searchAccess(value) {
  return {
    type: SEARCH_ACCESS,
    value,
  };
}

function changeSearchAccess(value) {
  return {
    type: CHANGE_SEARCH_ACCESS,
    value,
  };
}

function getAccesses() {
  return (dispatch) => {
    requestApi(dispatch, getAccessProgress, getAccessesApi)
      .then((response) => {
        const data = response.data.data.map(element => ({
          ...element,
          visible: true,
        }));
        dispatch(getAccessSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveAccess(clientData, remoteId, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getAccessProgress, saveAccessApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataAccess(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteAccess(clientData) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getAccessProgress, deleteAccessApi, clientData)
      .then(() => {
        dispatch(deleteDataAccess(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getAccesses,
  saveAccess,
  deleteAccess,
  searchAccess,
  changeSearchAccess,
  openModal,
  closeModal,
};
