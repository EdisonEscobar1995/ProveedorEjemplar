import setMessage from '../state/Generic/action';
import { loginUrl } from './api';

function getMessage(type) {
  switch (type) {
    case 'DOCUMENT_EXISTS':
      return 'Validation.documentExists';
    case 'DATE_TO_MAKE_SURVEY_EVALUATOR_EXCEEDED':
    case 'DATE_TO_MAKE_SURVEY_TECHNICAL_TEAM_EXCEEDED':
      return 'Validation.dateToEvaluate';
    case 'ALREADY_HAS_AN_EVALUATOR':
      return 'Validation.alreadyBeingEvaluated';
    case 'ALREADY_HAS_AN_TECHNICAL_TEAM_MEMBER':
      return 'Validation.alreadyBeingQualified';
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
    case 'INFORMATION_NOT_FOUND':
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
        const notice = (element.data.message === 'ALREADY_HAS_AN_EVALUATOR' ||
        element.data.message === 'ALREADY_HAS_AN_TECHNICAL_TEAM_MEMBER') ? element.data.notice : '';
        setMessage(getMessage(element.data.message), 'info', notice);
        throw new Error(element.data.message);
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

const executeApi = (dispatch, apiMethod, clientData) => (
  apiMethod(clientData)
    .then((response) => {
      let validateresponse = response;
      if (!Array.isArray(response)) {
        validateresponse = [response];
      }
      validateResponse(validateresponse);
      return response;
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

function sortByField(array, field, descending) {
  return array.sort((a, b) => {
    if (descending) {
      return a[field] > b[field] ? -1 : 1;
    }
    return a[field] < b[field] ? -1 : 1;
  });
}

export {
  requestApi,
  requestApiNotLoading,
  sortByField,
};
