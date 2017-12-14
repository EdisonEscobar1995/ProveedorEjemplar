import setMessage from '../state/Generic/action';
import { basePath } from './api';

function getMessage(type) {
  switch (type) {
    case 'DATE_TO_MAKE_SURVEY_EXCEEDED':
      return 'La fecha excede el tiempo de envio';
    case 'NO_DATA':
      return 'No se recibieron datos';
    case 'DONT_HAVE_SURVEY_ASSOCIED':
      return 'En estos momentos no se encuetran convocatorias abiertas';
    case 'SURVEY_DOES_NOT_EXIST':
      return 'No existe una encuesta para el tipo de suministro y tamaño de encuesta seleccionada';
    default:
      return 'Ocurrio un error al procesar la peticion';
  }
}

function validateResponse(args) {
  if (args.data === '') {
    throw new Error('NO_DATA');
  }
  try {
    [...args].forEach((element) => {
      if (element.headers['content-type'].toLowerCase().includes('text/html')) {
        location.href = `${basePath}?login&redirectto=${basePath}dist/index.html`;
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
      const error = getMessage(err.message);
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
  requestApi as default,
  requestApiNotLoading,
  sortByField,
};
