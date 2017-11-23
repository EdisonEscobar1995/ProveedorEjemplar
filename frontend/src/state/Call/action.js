import {
  GET_DATA_CALL_PROGRESS,
  GET_DATA_CALL_SUCCESS,
  REQUEST_FAILED,
} from './const';
// import { addData, saveData, editData, deleteData, cancelData } from '../TableForm/action';
import { getCallApi, saveCallApi } from '../../api/call';
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

function saveCall() {
  return saveCallApi();
}

export {
  getAllCalls,
  saveCall as saveData,
  /* addData,
  editData,
  cancelData, */
};
