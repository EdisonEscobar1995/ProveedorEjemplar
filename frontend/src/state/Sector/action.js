import {
  GET_DATA_SECTOR_PROGRESS,
  GET_DATA_SECTOR_SUCCESS,
  GET_DATA_SECTOR_FAILED,
} from './const';
import getDataSectortApi from '../../api/sector';


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

function getDataSectorFailed() {
  return {
    type: GET_DATA_SECTOR_FAILED,
  };
}

function getDataSector() {
  return (dispatch) => {
    dispatch(getDataSectorProgress());
    getDataSectortApi()
      .then((respose) => {
        const { data } = respose.data;
        dispatch(getDataSectorSuccess(data));
      })
      .catch(() => {
        dispatch(getDataSectorFailed());
      });
  };
}

export {
  getDataSector as default,
};
