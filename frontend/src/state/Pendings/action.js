import {
  GET_DATA_PENDINGS_PROGRESS,
  GET_DATA_PENDINGS_SUCCESS,
  FILTER_PENDINGS,
  REQUEST_FAILED,
} from './const';

import { getPendingsApi } from '../../api/supplier';
import { requestApi, sortByField } from '../../utils/action';

const getDataPendingsProgress = () => ({
  type: GET_DATA_PENDINGS_PROGRESS,
});

const getDataPendingsSuccess = data => ({
  type: GET_DATA_PENDINGS_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const filterPendings = data => ({
  type: FILTER_PENDINGS,
  data,
});

const getPendings = year => (dispatch) => {
  requestApi(dispatch, getDataPendingsProgress, getPendingsApi, year)
    .then((response) => {
      const { data } = response.data;
      data.suppliers = sortByField(data.suppliers, 'name').map((item) => {
        item.visible = true;
        return item;
      });
      dispatch(getDataPendingsSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getPendings,
  getFailedRequest,
  filterPendings,
};
