import {
  GET_SOCIETY_TYPE_PROGRESS,
  GET_SOCIETY_TYPE_SUCCESS,
  REQUEST_FAILED,
  ADD_SOCIETY_TYPE,
  UPDATE_SOCIETY_TYPE,
  DELETE_SOCIETY_TYPE,
  SEARCH_SOCIETY_TYPE,
  CHANGE_SEARCH_SOCIETY_TYPE,
} from './const';

import { getDataSocietyTypesApi, saveDataSocietyTypeApi, deleteDataSocietyTypeApi } from '../../api/societyType';
import { openModal, closeModal } from '../Main/action';
import { requestApi, sortByField } from '../../utils/action';
import blankSpaces from '../../utils/blankSpaces';

function getSocietyTypeProgress() {
  return {
    type: GET_SOCIETY_TYPE_PROGRESS,
  };
}

function getSocietyTypeSuccess(data) {
  return {
    type: GET_SOCIETY_TYPE_SUCCESS,
    data,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataSocietyType(id, data, remoteId) {
  return {
    type: id ? UPDATE_SOCIETY_TYPE : ADD_SOCIETY_TYPE,
    data,
    remoteId,
  };
}

function deleteDataSocietyType(data) {
  return {
    type: DELETE_SOCIETY_TYPE,
    data,
  };
}

function searchSocietyType(value) {
  return {
    type: SEARCH_SOCIETY_TYPE,
    value,
  };
}

function changeSearchSocietyType(value) {
  return {
    type: CHANGE_SEARCH_SOCIETY_TYPE,
    value,
  };
}

function getSocietyType() {
  return (dispatch) => {
    requestApi(dispatch, getSocietyTypeProgress, getDataSocietyTypesApi)
      .then((response) => {
        const data = sortByField(response.data.data, 'name')
          .map(element => ({
            ...element,
            visible: true,
          }));
        dispatch(getSocietyTypeSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveSocietyType(clientData, remoteId, next) {
  return (dispatch) => {
    if (!blankSpaces(dispatch, clientData.name)) {
      return;
    }
    clientData.name = clientData.name.trim();
    dispatch(closeModal());
    requestApi(dispatch, getSocietyTypeProgress, saveDataSocietyTypeApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataSocietyType(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteSocietyType(clientData) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getSocietyTypeProgress, deleteDataSocietyTypeApi, clientData)
      .then(() => {
        dispatch(deleteDataSocietyType(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getSocietyType,
  saveSocietyType,
  deleteSocietyType,
  searchSocietyType,
  changeSearchSocietyType,
  openModal,
  closeModal,
};

