import {
  GET_MENU_PROGRESS,
  GET_MENU_SUCCESS,
  REQUEST_FAILED,
  ADD_MENU,
  UPDATE_MENU,
  DELETE_MENU,
  SEARCH_MENU,
  CHANGE_SEARCH_MENU,
} from './const';

import { getMenuApi, saveMenuApi, deleteMenuApi } from '../../api/menu';
import getMasterApi from '../../api/master';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

function getMenuProgress() {
  return {
    type: GET_MENU_PROGRESS,
  };
}

function getMenuSuccess(data, masters) {
  return {
    type: GET_MENU_SUCCESS,
    data,
    masters,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataMenu(id, data, remoteId) {
  return {
    type: id ? UPDATE_MENU : ADD_MENU,
    data,
    remoteId,
  };
}

function deleteDataMenu(data) {
  return {
    type: DELETE_MENU,
    data,
  };
}

function searchMenu(value) {
  return {
    type: SEARCH_MENU,
    value,
  };
}

function changeSearchMenu(value) {
  return {
    type: CHANGE_SEARCH_MENU,
    value,
  };
}

function getMenu() {
  return (dispatch) => {
    requestApi(dispatch, getMenuProgress, getMasterApi, [
      'Rol',
    ])
      .then((masterResponse) => {
        requestApi(dispatch, getMenuProgress, getMenuApi)
          .then((response) => {
            const data = response.data.data.map(element => ({
              ...element,
              visible: true,
            }));
            const masters = masterResponse.data.data;
            masters.Category = [{
              id: 'Administración',
              name: 'Administración',
            },
            {
              id: 'Consultas',
              name: 'Consultas',
            },
            {
              id: 'Reportes',
              name: 'Reportes',
            }];

            dispatch(getMenuSuccess(data, masters));
          }).catch(() => {
            dispatch(getFailedRequest());
          });
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveMenu(clientData, remoteId, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getMenuProgress, saveMenuApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataMenu(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteMenu(clientData) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getMenuProgress, deleteMenuApi, clientData)
      .then(() => {
        dispatch(deleteDataMenu(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getMenu,
  saveMenu,
  deleteMenu,
  searchMenu,
  changeSearchMenu,
  openModal,
  closeModal,
};

