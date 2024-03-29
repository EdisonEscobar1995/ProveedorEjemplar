import {
  GET_DATA_SUPPLIER_REPORT_PROGRESS,
  GET_DATA_SUPPLIER_REPORT_SUCCESS,
  FILTER_SUPPLIER_REPORT,
  GET_TOTAL_SCORE_SUPPLIER,
  REQUEST_FAILED,
} from './const';

import { getParticipantsByYearApi } from '../../api/call';
import { getReportBySupplierApi } from '../../api/supplier';
import { requestApi, sortByField } from '../../utils/action';
import getMasterApi from '../../api/master';
import setMessage from '../Generic/action';
// import messages from '../../translation/messagesES';

function getTotalScoreSupplier(data) {
  return {
    type: GET_TOTAL_SCORE_SUPPLIER,
    data,
  };
}

const getDataSupplierReportProgress = data => ({
  type: GET_DATA_SUPPLIER_REPORT_PROGRESS,
  data,
});

const getDataSupplierReportSuccess = data => ({
  type: GET_DATA_SUPPLIER_REPORT_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const filterSupplierReport = data => ({
  type: FILTER_SUPPLIER_REPORT,
  data,
});

const getParticipantsByYear = year => (dispatch) => {
  requestApi(dispatch, getDataSupplierReportProgress, getMasterApi, ['Country', 'Dimension'])
    .then((masterResponse) => {
      requestApi(dispatch, getDataSupplierReportProgress, getParticipantsByYearApi, year)
        .then((response) => {
          const { data } = response.data;
          data.suppliers = sortByField(data.suppliers, 'name').map((item) => {
            item.visible = true;
            return item;
          });
          data.masters.Participated = [
            { id: 'true', name: 'Si' },
            { id: 'false', name: 'No' },
            { id: 'empty', name: 'Sin respuesta' },
          ];
          data.masters.OriginCountry = masterResponse.data.data.Country;
          data.masters.Dimension = masterResponse.data.data.Dimension;
          const totalScoreSupplier = null;
          dispatch(getDataSupplierReportSuccess(data));
          dispatch(getTotalScoreSupplier(totalScoreSupplier));
        }).catch(() => {
          dispatch(getFailedRequest());
        });
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};


const getReportBySupplier = data => (dispatch) => {
  requestApi(dispatch, getDataSupplierReportProgress, getReportBySupplierApi, data)
    .then((response) => {
      if (response.data.data.idSupplier) {
        dispatch(getTotalScoreSupplier(response.data.data));
      } else {
        dispatch(getDataSupplierReportProgress({ loading: false }));
        setMessage('Validation.informationNotFound', 'info');
      }
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getParticipantsByYear,
  getFailedRequest,
  getReportBySupplier,
  getDataSupplierReportProgress,
  getTotalScoreSupplier,
  filterSupplierReport,
};
