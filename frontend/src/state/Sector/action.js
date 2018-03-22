import {
  GET_SECTOR_PROGRESS,
  GET_SECTOR_SUCCESS,
  REQUEST_FAILED,
  ADD_SECTOR,
  UPDATE_SECTOR,
  DELETE_SECTOR,
  SEARCH_SECTOR,
  CHANGE_SEARCH_SECTOR,
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

function saveDataSector(id, data, remoteId) {
  return {
    type: id ? UPDATE_SECTOR : ADD_SECTOR,
    data,
    remoteId,
  };
}

function deleteDataSector(data) {
  return {
    type: DELETE_SECTOR,
    data,
  };
}

function searchSector(value) {
  return {
    type: SEARCH_SECTOR,
    value,
  };
}

function changeSearchSector(value) {
  return {
    type: CHANGE_SEARCH_SECTOR,
    value,
  };
}

function getSectors() {
  return (dispatch) => {
    requestApi(dispatch, getSectorProgress, getSectorsApi)
      .then((response) => {
        const data = response.data.data.map(element => ({
          ...element,
          visible: true,
        }));
        dispatch(getSectorSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveSector(clientData, remoteId, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getSectorProgress, saveSectorApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataSector(clientData.id, data, remoteId));
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
  searchSector,
  changeSearchSector,
  openModal,
  closeModal,
};
