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

function saveDataSector(data, index, id) {
  return {
    type: id ? SAVE_SECTOR : ADD_SECTOR,
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

function getSectors() {
  return (dispatch) => {
    requestApi(dispatch, getSectorProgress, getSectorsApi)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(getSectorSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveSector(clientData, index) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getSectorProgress, saveSectorApi, clientData)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(saveDataSector(data, index, clientData.id));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteSector(clientData, index) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getSectorProgress, deleteSectorApi, clientData)
      .then(() => {
        dispatch(deleteDataSector(index));
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
