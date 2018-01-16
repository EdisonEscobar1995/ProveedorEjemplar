import setMessage from '../state/Generic/action';
import { loginUrl } from './api';

function getMessage(type) {
  switch (type) {
    case 'DATE_TO_MAKE_SURVEY_EXCEEDED':
      return 'Validation.dateToSend';
    case 'NO_DATA':
      return 'Validation.noData';
    case 'DONT_HAVE_SURVEY_ASSOCIED':
      return 'Validation.noOpenCall';
    case 'SURVEY_DOES_NOT_EXIST':
      return 'Validation.supplier';
    case 'THE_SURVEY_COULD_NOT_BE_COMPLETED':
      return 'Validation.surveyCouldNotComplete';
    case 'INFORMATION_NOT_FOUNT':
      return 'Validation.informationNotFound';
    case 'ROL_INVALID':
    case 'UNAUTHORIZED':
      return 'Validation.unauthorized';
    default:
      return 'Validation.wentWrong';
  }
}

function validateResponse(args) {
  if (args.data === '') {
    throw new Error('NO_DATA');
  }
  try {
    [...args].forEach((element) => {
      if (element.headers['content-type'].toLowerCase().includes('text/html')) {
        location.href = loginUrl;
      } else if (!element.data.status) {
        throw new Error(element.data.message);
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

const executeApi = (dispatch, apiMethod, clientData) => (
  apiMethod(clientData)
    .then((respone) => {
      let validateresponse = respone;
      if (!Array.isArray(respone)) {
        validateresponse = [respone];
      }
      validateResponse(validateresponse);
      return respone;
    }).catch((err) => {
      const error = getMessage(err.response.statusText.toUpperCase());
      dispatch(setMessage(error, 'error'));
      throw err;
    })
);

const requestApi = (dispatch, loadMethod, apiMethod, clientData) => {
  dispatch(loadMethod());
  return executeApi(dispatch, apiMethod, clientData);
};

const requestApiNotLoading = (dispatch, apiMethod, clientData) => (
  executeApi(dispatch, apiMethod, clientData)
);

function sortByField(array, field) {
  return array.sort((a, b) => (a[field] < b[field] ? -1 : 1));
}

export {
  requestApi,
  requestApiNotLoading,
  sortByField,
};
