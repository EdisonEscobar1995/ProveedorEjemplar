import axios from 'axios';
import {
  GET_DATA_SURVEY_ADMON_PROGRESS,
  GET_DATA_SURVEY_ADMON_SUCCESS,
  // GET_SURVEY_ADMON_PROGRESS,
  GET_SURVEY_ADMON_SUCCESS,
  SEARCH_SURVEY_ADMON,
  CHANGE_SEARCH_SURVEY_ADMON,
  // SAVE_SURVEY_ADMON,
  DELETE_SURVEY_ADMON,
  REQUEST_FAILED,
} from './const';

import
{ getAllDataSurveyApi, deleteSurveyApi } // saveSurveyApi
  from '../../api/survey';
import { getSuppliesApi } from '../../api/supply';
import { getDataCompanySizeApi } from '../../api/companySize';
import { requestApi } from '../../utils/action';
import setMessage from '../Generic/action';

const getDataSurveyProgress = () => ({
  type: GET_DATA_SURVEY_ADMON_PROGRESS,
});

const getDataSurveySuccess = (data, supply, companySize) => ({
  type: GET_DATA_SURVEY_ADMON_SUCCESS,
  data,
  supply,
  companySize,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getAllSurveys = () => (dispatch) => {
  requestApi(dispatch, getDataSurveyProgress, getSuppliesApi)
    .then((supplyResponse) => {
      const supply = supplyResponse.data;
      requestApi(dispatch, getDataSurveyProgress, getDataCompanySizeApi)
        .then((companySizeResponse) => {
          const companySize = companySizeResponse.data;
          requestApi(dispatch, getDataSurveyProgress, getAllDataSurveyApi)
            .then((response) => {
              const { data } = response.data;
              const dataFilter = data.map(item => ({ ...item, visible: true }));
              dispatch(getDataSurveySuccess(dataFilter, supply, companySize));
            });
        });
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

// const getSurveyProgress = () => ({
//   type: GET_SURVEY_ADMON_PROGRESS,
// });

const getAllDataSurveyAdmonSuccess = (supply, companySize) => ({
  type: GET_SURVEY_ADMON_SUCCESS,
  supply,
  companySize,
});

function getAllDataSurveyAdmon() {
  return (dispatch) => {
    const promises = [
      getSuppliesApi(),
      getDataCompanySizeApi(),
    ];
    requestApi(dispatch, getDataSurveyProgress, axios.all, promises).then((arrayResponse) => {
      const supply = arrayResponse[0].data.data;
      const companySize = arrayResponse[1].data.data;
      dispatch(getAllDataSurveyAdmonSuccess(supply, companySize));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
  };
}

function searchSurvey(value) {
  return {
    type: SEARCH_SURVEY_ADMON,
    value,
  };
}

function changeSearchSurvey(value) {
  return {
    type: CHANGE_SEARCH_SURVEY_ADMON,
    value,
  };
}

// function saveDataSurvey(data) {
//   return {
//     type: SAVE_SURVEY_ADMON,
//     data,
//   };
// }

const deleteSurveySuccess = () => ({
  type: DELETE_SURVEY_ADMON,
});

const deleteSurvey = id => (dispatch) => {
  requestApi(dispatch, getDataSurveyProgress, deleteSurveyApi, id)
    .then(() => {
      dispatch(deleteSurveySuccess());
      dispatch(setMessage('La pregunta ha sido eliminada', 'success'));
      dispatch(getAllSurveys());
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

// function saveSurvey(clientData, next) {
//   return (dispatch, getState) => {
//     requestApi(dispatch, getSurveyProgress, saveSurveyApi, clientData)
//       .then((response) => {
//         const { data } = response.data;
//         dispatch(saveDataSurvey(data));
//       }).then(() => {
//         if (clientData.type === 'Cerrada') {
//           const dataOptions = getState().Survey.options;
//           const emptyData = dataOptions.filter(x => x.wording === '');
//           if (emptyData.length > 0) {
//             dispatch(setMessage('Las opciones de respuesta son obligatorias.', 'warning'));
//             return;
//           }
//           if (emptyData.length === 0) {
//             dataOptions.forEach((element) => {
//               dispatch(saveOptionsSurvey(element));
//             });
//           }
//         }
//         if (next) {
//           next();
//         }
//       }).catch(() => {
//         dispatch(getFailedRequest());
//       });
//   };
// }

const saveSurvey = () => ({
  type: 'save',
});

export {
  getAllSurveys,
  getAllDataSurveyAdmon,
  changeSearchSurvey,
  searchSurvey,
  saveSurvey as saveData,
  deleteSurvey,
};
