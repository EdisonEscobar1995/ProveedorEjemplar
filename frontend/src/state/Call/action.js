import {
  GET_DATA_CALL_PROGRESS,
  GET_DATA_CALL_SUCCESS,
  GET_CALL_SUCCESS,
  GET_CALL_PROGRESS,
  CLEAR_EDIT,
  REQUEST_FAILED,
} from './const';
// import { addData, saveData, editData, deleteData, cancelData } from '../TableForm/action';
import { getCallApi, getCallByIdApi, saveCallApi } from '../../api/call';
import requestApi from '../../utils/actionUtils';

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
    .then((respose) => {
      const { data } = respose.data;
      dispatch(getDataCallSuccess(data));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
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
    .then((respose) => {
      const { data } = respose.data;
      dispatch(getCallSuccess(data));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

const clearDataEdit = () => ({
  type: CLEAR_EDIT,
});

function saveCall() {
  return saveCallApi();
}

export {
  getAllCalls,
  getCall,
  clearDataEdit,
  saveCall as saveData,
  /* addData,
  editData,
  cancelData, */
};
