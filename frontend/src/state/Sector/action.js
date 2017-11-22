import {
  GET_DATA_SECTOR_PROGRESS,
  GET_DATA_SECTOR_SUCCESS,
  SAVE_DATA_SECTOR_SUCCESS,
  DELETE_DATA_SECTOR_SUCCESS,
  REQUEST_FAILED,
} from './const';
import { getAllSectorApi, saveSectorApi, deleteSectorApi } from '../../api/sector';

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
function saveSectorSuccess(actual) {
  return {
    type: SAVE_DATA_SECTOR_SUCCESS,
    actual,
  };
}
function deleteSectorSuccess(data) {
  return {
    type: DELETE_DATA_SECTOR_SUCCESS,
    data,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function getAllSector() {
  return (dispatch) => {
    dispatch(getDataSectorProgress());
    getAllSectorApi()
      .then((respose) => {
        const { data } = respose.data;
        dispatch(getDataSectorSuccess(data));
      })
      .catch(() => {
        dispatch(getFailedRequest());
      });
  };
}
function saveSector(clientData) {
  return (dispatch) => {
    dispatch(getDataSectorProgress());
    saveSectorApi(clientData)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(saveSectorSuccess(data));
      })
      .catch(() => {
        dispatch(getFailedRequest());
      });
  };
}
function deleteSector(clientData) {
  return (dispatch) => {
    dispatch(getDataSectorProgress());
    deleteSectorApi(clientData)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(deleteSectorSuccess(data));
      })
      .catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getAllSector,
  saveSector,
  deleteSector,
};
