import setMessage from '../state/Generic/action';

function validateResponse(args) {
  const errorMessage = 'Fallo en la respuesta';
  try {
    [...args].forEach((element) => {
      if (!element.data.status) {
        throw new Error(errorMessage);
      }
    });
  } catch (err) {
    throw new Error(errorMessage);
  }
}

function requestApi(dispatch, loadMethod, apiMethod, clientData) {
  dispatch(loadMethod());
  return apiMethod(clientData)
    .then((respone) => {
      validateResponse(respone);
      return respone;
    }).catch((err) => {
      let error = err;
      if (typeof err !== 'string') {
        error = 'Ocurrio un error al procesar la peticion';
      }
      dispatch(setMessage(error, 'error'));
      throw err;
    });
}

export default requestApi;
