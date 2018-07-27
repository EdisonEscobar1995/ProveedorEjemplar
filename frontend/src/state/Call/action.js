import {
  GET_DATA_CALL_PROGRESS,
  GET_DATA_CALL_SUCCESS,
  GET_CALL_PROGRESS,
  GET_CALL_SUCCESS,
  CLEAR_EDIT,
  CHANGE_SEARCH_CALL,
  SEARCH_CALL,
  CHANGE_DISABLED,
  SAVE_CALL,
  DELETE_CALL,
  REQUEST_FAILED,
} from './const';

import { getCallApi, getCallByIdApi, saveCallApi, deleteCallApi } from '../../api/call';
import { requestApi, sortByField } from '../../utils/action';
import setMessage from '../Generic/action';

const getDataCallProgress = () => ({
  type: GET_DATA_CALL_PROGRESS,
});

const getDataCallSuccess = data => ({
  type: GET_DATA_CALL_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getAllCalls = () => (dispatch) => {
  requestApi(dispatch, getDataCallProgress, getCallApi)
    .then((response) => {
      const { data } = response.data;
      const dataFilter = data.map(item => ({ ...item, visible: true }));
      dispatch(getDataCallSuccess(sortByField(dataFilter, 'year', true)));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const getCallProgress = () => ({
  type: GET_CALL_PROGRESS,
});

const getCallSuccess = data => ({
  type: GET_CALL_SUCCESS,
  data,
});

const getCall = id => (dispatch) => {
  requestApi(dispatch, getCallProgress, getCallByIdApi, id)
    .then((response) => {
      const { data } = response.data;
      const dateToFinishCall = new Date(data.dateToFinishCall);
      const today = new Date().getDate();
      data.disabled = false;
      if (today > dateToFinishCall) {
        data.disabledByDate = true;
      } else {
        data.disabledByDate = false;
      }
      dispatch(getCallSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

function searchCall(value) {
  return {
    type: SEARCH_CALL,
    value,
  };
}

function changeSearchCall(value) {
  return {
    type: CHANGE_SEARCH_CALL,
    value,
  };
}

function changeDisabled() {
  return {
    type: CHANGE_DISABLED,
  };
}

function saveDataCall(data) {
  return {
    type: SAVE_CALL,
    data,
  };
}

const deleteCallSuccess = () => ({
  type: DELETE_CALL,
});

const clearDataEdit = () => ({
  type: CLEAR_EDIT,
});

const deleteCall = id => (dispatch) => {
  requestApi(dispatch, getDataCallProgress, deleteCallApi, id)
    .then(() => {
      dispatch(deleteCallSuccess());
      dispatch(setMessage('La convocatoría ha sido eliminada', 'success'));
      dispatch(getAllCalls());
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

function saveCall(clientData, next) {
  return (dispatch) => {
    requestApi(dispatch, getCallProgress, saveCallApi, clientData)
      .then((response) => {
        const { data } = response.data;
        dispatch(saveDataCall(data));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getAllCalls,
  getCall,
  clearDataEdit,
  changeSearchCall,
  searchCall,
  saveCall as saveData,
  changeDisabled,
  deleteCall,
};
