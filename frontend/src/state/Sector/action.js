import {
  GET_DATA_SECTOR_PROGRESS,
  GET_DATA_SECTOR_SUCCESS,
  REQUEST_FAILED,
  ADD_SECTOR,
  SAVE_SECTOR,
  EDIT_SECTOR,
  DELETE_SECTOR,
  CANCEL_SECTOR,
} from './const';
import { getAllSectorApi, saveSectorApi, deleteSectorApi } from '../../api/sector';
import requestApi from '../../utils/actionUtils';

function getDataSectorProgress() {
  return {
    type: GET_DATA_SECTOR_PROGRESS,
  };
}

function getDataSectorSuccess(data) {
  return {
    type: GET_DATA_SECTOR_SUCCESS,
    data,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function addDataSector(newItem, index) {
  return {
    type: ADD_SECTOR,
    newItem,
    index,
  };
}
function editDataSector(index) {
  return {
    type: EDIT_SECTOR,
    index,
  };
}
function saveDataSector(data, index) {
  return {
    type: SAVE_SECTOR,
    data,
    index,
  };
}
function deleteDataSector(index) {
  return {
    type: DELETE_SECTOR,
    index,
  };
}
function cancelDataSector(index) {
  return {
    type: CANCEL_SECTOR,
    index,
  };
}

function getAllSector() {
  return (dispatch) => {
    requestApi(dispatch, getDataSectorProgress, getAllSectorApi)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(getDataSectorSuccess(data));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  };
}
function saveSector(clientData, index) {
  return (dispatch) => {
    requestApi(dispatch, getDataSectorProgress, saveSectorApi, clientData)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(saveDataSector(data, index));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  };
}
function deleteSector(clientData, index) {
  return (dispatch) => {
    requestApi(dispatch, getDataSectorProgress, deleteSectorApi, clientData)
      .then(() => {
        dispatch(deleteDataSector(index));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  };
}

export {
  getAllSector,
  saveSector as saveDataSector,
  deleteSector as deleteDataSector,
  addDataSector,
  editDataSector,
  cancelDataSector,
};
