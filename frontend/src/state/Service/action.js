import {
  GET_SERVICE_PROGRESS,
  GET_SERVICE_SUCCESS,
  GET_ITEM_BY_SERVICE_SUCCESS,
  REQUEST_FAILED,
  ADD_SERVICE,
  SAVE_SERVICE,
  DELETE_SERVICE,
  ADD_ITEM,
  SAVE_ITEM,
  DELETE_ITEM,
  SEARCH_SERVICE,
  SEARCH_ITEM,
  COLLAPSE_SERVICE,
} from './const';
import {
  getServicesApi, saveServiceApi, deleteServiceApi,
  getItemByServiceApi, saveItemApi, deleteItemApi,
} from '../../api/service';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

function getServiceProgress() {
  return {
    type: GET_SERVICE_PROGRESS,
  };
}

function getServiceSuccess(data) {
  return {
    type: GET_SERVICE_SUCCESS,
    data,
  };
}

function getItemByServiceSuccess(data, id) {
  return {
    type: GET_ITEM_BY_SERVICE_SUCCESS,
    data,
    id,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataService(data, id) {
  return {
    type: id ? SAVE_SERVICE : ADD_SERVICE,
    data,
  };
}

function saveDataItem(data, id) {
  return {
    type: id ? SAVE_ITEM : ADD_ITEM,
    data,
  };
}

function deleteDataService(data) {
  return {
    type: DELETE_SERVICE,
    data,
  };
}

function deleteDataItem(data) {
  return {
    type: DELETE_ITEM,
    data,
  };
}

function searchService(value) {
  return {
    type: SEARCH_SERVICE,
    value,
  };
}

function searchItem(value, parentId) {
  return {
    type: SEARCH_ITEM,
    value,
    parentId,
  };
}

function collapseService(data) {
  return {
    type: COLLAPSE_SERVICE,
    data,
  };
}

function getServices() {
  return (dispatch) => {
    requestApi(dispatch, getServiceProgress, getServicesApi)
      .then((response) => {
        const data = response.data.data.map(element => ({
          ...element,
          visible: true,
        }));
        dispatch(getServiceSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function getItemByService(id) {
  return (dispatch) => {
    requestApi(dispatch, getServiceProgress, getItemByServiceApi, id)
      .then((response) => {
        const data = response.data.data.map(element => ({
          ...element,
          visible: true,
        }));
        dispatch(getItemByServiceSuccess(data, id));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveService(clientData, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getServiceProgress, saveServiceApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataService(data, clientData.id));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveItem(clientData, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getServiceProgress, saveItemApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataItem(data, clientData.id));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteService(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getServiceProgress, deleteServiceApi, clientData)
      .then(() => {
        dispatch(deleteDataService(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteItem(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getServiceProgress, deleteItemApi, clientData)
      .then(() => {
        dispatch(deleteDataItem(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getServices,
  getItemByService,
  saveService,
  deleteService,
  deleteItem,
  saveItem,
  searchService,
  searchItem,
  collapseService,
  openModal,
  closeModal,
};
