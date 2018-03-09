import {
  GET_USER_PROGRESS,
  GET_USER_SUCCESS,
  REQUEST_FAILED,
  ADD_USER,
  SAVE_USER,
  DELETE_USER,
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

function saveDataUser(data, index, id) {
  return {
    type: id ? SAVE_USER : ADD_USER,
    data,
    index,
  };
}

function deleteDataUser(index) {
  return {
    type: DELETE_USER,
    index,
  };
}

function getUsers() {
  return (dispatch) => {
    requestApi(dispatch, getUserProgress, getRolesApi)
      .then((rolesResponse) => {
        requestApi(dispatch, getUserProgress, getUsersApi)
          .then((response) => {
            const { data } = response.data;
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

function saveUser(clientData, index, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getUserProgress, saveUserApi, clientData)
      .then((response) => {
        const { data } = response.data;
        dispatch(saveDataUser(data, index, clientData.id));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteUser(clientData, index) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getUserProgress, deleteUserApi, clientData)
      .then(() => {
        dispatch(deleteDataUser(index));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getUsers,
  saveUser,
  deleteUser,
  openModal,
  closeModal,
};
