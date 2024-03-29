import {
  GET_DATA_CALL_REPORT_PROGRESS,
  GET_DATA_CALL_REPORT_SUCCESS,
  FILTER_CALL_REPORT,
  REQUEST_FAILED,
} from './const';

import { getParticipantsByYearApi } from '../../api/call';
import { requestApi, sortByField } from '../../utils/action';
import getMasterApi from '../../api/master';

const getDataCallReportProgress = () => ({
  type: GET_DATA_CALL_REPORT_PROGRESS,
});

const getDataCallReportSuccess = data => ({
  type: GET_DATA_CALL_REPORT_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const filterCallReport = data => ({
  type: FILTER_CALL_REPORT,
  data,
});

const getParticipantsByYear = year => (dispatch) => {
  requestApi(dispatch, getDataCallReportProgress, getMasterApi, ['Country', 'Dimension'])
    .then((masterResponse) => {
      requestApi(dispatch, getDataCallReportProgress, getParticipantsByYearApi, year)
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
          dispatch(getDataCallReportSuccess(data));
        }).catch(() => {
          dispatch(getFailedRequest());
        });
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getParticipantsByYear,
  getFailedRequest,
  filterCallReport,
};
