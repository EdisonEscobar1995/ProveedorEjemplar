import {
  GET_USER_PROGRESS,
  GET_USER_SUCCESS,
  REQUEST_FAILED,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SEARCH_USER,
  CHANGE_SEARCH_USER,
} from './const';
import { getUsersApi, saveUserApi, deleteUserApi } from '../../api/user';
import getRolesApi from '../../api/role';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

function getUserProgress() {
  return {
    type: GET_USER_PROGRESS,
  };
}

function getUserSuccess(data, masters) {
  return {
    type: GET_USER_SUCCESS,
    data,
    masters,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataUser(id, data, remoteId) {
  return {
    type: id ? UPDATE_USER : ADD_USER,
    data,
    remoteId,
  };
}

function deleteDataUser(data) {
  return {
    type: DELETE_USER,
    data,
  };
}

function searchUser(value) {
  return {
    type: SEARCH_USER,
    value,
  };
}

function changeSearchUser(value) {
  return {
    type: CHANGE_SEARCH_USER,
    value,
  };
}

function getUsers() {
  return (dispatch) => {
    requestApi(dispatch, getUserProgress, getRolesApi)
      .then((rolesResponse) => {
        requestApi(dispatch, getUserProgress, getUsersApi)
          .then((response) => {
            const data = response.data.data.map(element => ({
              ...element,
              visible: true,
            }));
            const masters = {
              Roles: rolesResponse.data.data,
            };
            dispatch(getUserSuccess(data, masters));
          }).catch(() => {
            dispatch(getFailedRequest());
          });
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveUser(clientData, remoteId, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getUserProgress, saveUserApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataUser(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteUser(clientData) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getUserProgress, deleteUserApi, clientData)
      .then(() => {
        dispatch(deleteDataUser(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getUsers,
  saveUser,
  deleteUser,
  searchUser,
  changeSearchUser,
  openModal,
  closeModal,
};
