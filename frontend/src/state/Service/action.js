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

function saveDataService(data, index, id) {
  return {
    type: id ? SAVE_SERVICE : ADD_SERVICE,
    data,
    index,
  };
}

function saveDataItem(data, index, id) {
  return {
    type: id ? SAVE_ITEM : ADD_ITEM,
    data,
    index,
  };
}

function deleteDataService(index) {
  return {
    type: DELETE_SERVICE,
    index,
  };
}

function deleteDataItem(index, data) {
  return {
    type: DELETE_ITEM,
    index,
    data,
  };
}

function getServices() {
  return (dispatch) => {
    requestApi(dispatch, getServiceProgress, getServicesApi)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(getServiceSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function getItemByService(id) {
  return (dispatch) => {
    requestApi(dispatch, getServiceProgress, getItemByServiceApi, id)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(getItemByServiceSuccess(data, id));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveService(clientData, index) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getServiceProgress, saveServiceApi, clientData)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(saveDataService(data, index, clientData.id));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveItem(clientData, index) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getServiceProgress, saveItemApi, clientData)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(saveDataItem(data, index, clientData.id));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteService(clientData, index) {
  return (dispatch) => {
    requestApi(dispatch, getServiceProgress, deleteServiceApi, clientData)
      .then(() => {
        dispatch(deleteDataService(index));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteItem(clientData, index) {
  return (dispatch) => {
    requestApi(dispatch, getServiceProgress, deleteItemApi, clientData)
      .then(() => {
        dispatch(deleteDataItem(index, clientData));
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
  openModal,
  closeModal,
};
