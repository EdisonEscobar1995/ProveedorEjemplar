import {
  GET_SECTOR_PROGRESS,
  GET_SECTOR_SUCCESS,
  REQUEST_FAILED,
  ADD_SECTOR,
  SAVE_SECTOR,
  DELETE_SECTOR,
} from './const';
import { getSectorsApi, saveSectorApi, deleteSectorApi } from '../../api/sector';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

function getSectorProgress() {
  return {
    type: GET_SECTOR_PROGRESS,
  };
}

function getSectorSuccess(data) {
  return {
    type: GET_SECTOR_SUCCESS,
    data,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataSector(data, id) {
  return {
    type: id ? SAVE_SECTOR : ADD_SECTOR,
    data,
  };
}

function deleteDataSector(data) {
  return {
    type: DELETE_SECTOR,
    data,
  };
}

function getSectors() {
  return (dispatch) => {
    requestApi(dispatch, getSectorProgress, getSectorsApi)
      .then((response) => {
        const { data } = response.data;
        dispatch(getSectorSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveSector(clientData, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getSectorProgress, saveSectorApi, clientData)
      .then((response) => {
        const { data } = response.data;
        dispatch(saveDataSector(data, clientData.id));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteSector(clientData) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getSectorProgress, deleteSectorApi, clientData)
      .then(() => {
        dispatch(deleteDataSector(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getSectors,
  saveSector,
  deleteSector,
  openModal,
  closeModal,
};
