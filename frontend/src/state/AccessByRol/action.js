import {
  GET_ACCESS_BY_ROL_PROGRESS,
  GET_ACCESS_BY_ROL_SUCCESS,
  REQUEST_FAILED,
  ADD_ACCESS_BY_ROL,
  UPDATE_ACCESS_BY_ROL,
  DELETE_ACCESS_BY_ROL,
  SEARCH_ACCESS_BY_ROL,
  CHANGE_SEARCH_ACCESS_BY_ROL,
} from './const';
import { getAccessByRolApi, saveAccessByRolApi, deleteAccessByRolApi } from '../../api/accessByRol';
import getMasterApi from '../../api/master';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

function getAccessByRolProgress() {
  return {
    type: GET_ACCESS_BY_ROL_PROGRESS,
  };
}

function getAccessByRolSuccess(data, masters) {
  return {
    type: GET_ACCESS_BY_ROL_SUCCESS,
    data,
    masters,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataAccessByRol(id, data, remoteId) {
  return {
    type: id ? UPDATE_ACCESS_BY_ROL : ADD_ACCESS_BY_ROL,
    data,
    remoteId,
  };
}

function deleteDataAccessByRol(data) {
  return {
    type: DELETE_ACCESS_BY_ROL,
    data,
  };
}

function searchAccessByRol(value) {
  return {
    type: SEARCH_ACCESS_BY_ROL,
    value,
  };
}

function changeSearchAccessByRol(value) {
  return {
    type: CHANGE_SEARCH_ACCESS_BY_ROL,
    value,
  };
}

function getAccessByRol() {
  return (dispatch) => {
    requestApi(dispatch, getAccessByRolProgress, getMasterApi, ['Access', 'Rol'])
      .then((mastersResponse) => {
        requestApi(dispatch, getAccessByRolProgress, getAccessByRolApi)
          .then((response) => {
            const data = response.data.data.map(element => ({
              ...element,
              visible: true,
            }));
            const masters = {
              Access: mastersResponse.data.data.Access.map(element => ({
                ...element,
                name: `${element.api} - ${element.action}`,
              })),
              Roles: mastersResponse.data.data.Rol,
            };
            dispatch(getAccessByRolSuccess(data, masters));
          }).catch(() => {
            dispatch(getFailedRequest());
          });
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveAccessByRol(clientData, remoteId, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getAccessByRolProgress, saveAccessByRolApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataAccessByRol(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteAccessByRol(clientData) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getAccessByRolProgress, deleteAccessByRolApi, clientData)
      .then(() => {
        dispatch(deleteDataAccessByRol(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getAccessByRol,
  saveAccessByRol,
  deleteAccessByRol,
  searchAccessByRol,
  changeSearchAccessByRol,
  openModal,
  closeModal,
};
