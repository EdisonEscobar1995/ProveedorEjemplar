import setMessage from '../state/Generic/action';

function getMessage(type) {
  switch (type) {
    case 'DATE_TO_MAKE_SURVEY_EXCEEDED':
      return '';
    case 'NO_DATA':
      return 'No se recibieron datos';
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
      if (!element.data.status) {
        throw new Error(element.data.message);
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

function requestApi(dispatch, loadMethod, apiMethod, clientData) {
  dispatch(loadMethod());
  return apiMethod(clientData)
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
    });
}
function requestApiNotLoading(dispatch, apiMethod, clientData) {
  return apiMethod(clientData)
    .then((respone) => {
      let validateresponse = respone;
      if (!Array.isArray(respone)) {
        validateresponse = [respone];
      }
      validateResponse(validateresponse);
      return respone;
    }).catch((err) => {
      let error = err;
      if (typeof err !== 'string') {
        error = getMessage();
      }
      dispatch(setMessage(error, 'error'));
      throw err;
    });
}

export {
  requestApi as default,
  requestApiNotLoading,
};
