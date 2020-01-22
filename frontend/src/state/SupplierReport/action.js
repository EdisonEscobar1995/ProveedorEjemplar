import axios from 'axios';
import {
  GET_DATA_SUPPLIER_REPORT_PROGRESS,
  GET_DATA_SUPPLIER_REPORT_SUCCESS,
  FILTER_SUPPLIER_REPORT,
  GET_DATA_DIMENSIONS,
  REQUEST_FAILED,
} from './const';

import { getParticipantsByYearApi } from '../../api/call';
// import { getReportBySupplierApi } from '../../api/supplier';
import { getDimensionsBySurveyApi } from '../../api/dimension';
import { formatData } from '../Supplier/action';
import { getDataQuestionsBySurveyApi } from '../../api/supplier';
// import getDataStateApi from '../../api/state';
import { requestApi, sortByField, requestApiNotLoading } from '../../utils/action';
import getMasterApi from '../../api/master';

function getDataDimensionsSuccess(dimensions) {
  return {
    type: GET_DATA_DIMENSIONS,
    dimensions,
  };
}

const getDataSupplierReportProgress = () => ({
  type: GET_DATA_SUPPLIER_REPORT_PROGRESS,
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
          const dimensions = [];
          dispatch(getDataSupplierReportSuccess(data));
          dispatch(getDataDimensionsSuccess(dimensions));
        }).catch(() => {
          dispatch(getFailedRequest());
        });
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

/* requestApi(dispatch, getDataSupplierReportProgress, getReportBySupplierApi,
    { idSurvey, idSupplierByCall: id })
    .then(response => response.data.data)
    .then((data) => {
      console.log(data);
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    }); */

/* const loadStateData = async (dispatch, api, callIdState) => {
  const allData = {};
  return requestApiNotLoading(dispatch, api, callIdState)
    .then((respone) => {
      allData.stateData = respone.data.data;
      return allData;
    }).catch(() => {
      allData.stateData = { shortName: '' };
      return allData;
    });
}; */


const getReportBySupplier = (idSurvey, id, stateData) => (
  (dispatch, getActualState) => {
    // const { stateData } = await loadStateData(dispatch, getDataStateApi, callIdState);
    const { rules } = getActualState().supplier;
    const { dimensions } = getActualState().supplierReport;
    if (dimensions.length === 0) {
      requestApi(dispatch, getDataSupplierReportProgress, getDimensionsBySurveyApi, idSurvey)
        .then(response => response.data.data)
        .then((data) => {
          const promises = [];
          data.forEach((dimesion) => {
            const dataSend = { idSurvey, idDimension: dimesion.id, id };
            promises.push(getDataQuestionsBySurveyApi({ ...dataSend }));
          });
          return requestApiNotLoading(dispatch, axios.all, promises)
            .then((criterionsResponse) => {
              const criterions = [];
              criterionsResponse.forEach((element) => {
                criterions.push(element.data.data);
              });
              return criterions;
            })
            .then(criterions => ({ dimensions: data, criterions }));
        }).then((data) => {
          const formatedDimensions = formatData(data, stateData, rules);
          dispatch(getDataDimensionsSuccess(formatedDimensions));
        })
        .catch((err) => {
          dispatch(getFailedRequest(err));
        });
    }
  }
);
export {
  getParticipantsByYear,
  getFailedRequest,
  getReportBySupplier,
  filterSupplierReport,
};
