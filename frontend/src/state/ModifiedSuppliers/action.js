import {
  GET_DATA_MODIFIED_SUPPLIERS_PROGRESS,
  GET_DATA_MODIFIED_SUPPLIERS_SUCCESS,
  REQUEST_FAILED,
} from './const';

import { getModifiedSuppliersApi } from '../../api/supplier';
import requestApi from '../../utils/actionUtils';

const getDataModifiedSuppliersProgress = () => ({
  type: GET_DATA_MODIFIED_SUPPLIERS_PROGRESS,
});

const getDataModifiedSuppliersSuccess = data => ({
  type: GET_DATA_MODIFIED_SUPPLIERS_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getAllModifiedSuppliers = () => (dispatch) => {
  requestApi(dispatch, getDataModifiedSuppliersProgress, getModifiedSuppliersApi)
    .then((respose) => {
      const { data } = respose.data;
      dispatch(getDataModifiedSuppliersSuccess(data));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

export {
  getAllModifiedSuppliers,
  getFailedRequest,
  /*
  addData,
  editData,
  cancelData, 
  */
};
