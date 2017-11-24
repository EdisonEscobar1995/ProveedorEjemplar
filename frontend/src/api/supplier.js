import intance from './instance';

function getDataSuppliertApi() {
  return intance.get('Supplier?action=loadInformation');
}

function getDataCallSuppliertApi() {
  return intance.get('SupplierByCall?action=currentCall');
}
function saveDataCallBySupplierApi(data) {
  return intance.post('SupplierByCall?action=save', data);
}

function getDataQuestionsBySurverrApi(data) {
  const { idSurvey, idDimension } = data;
  return intance.get(`Supplier?action=getQuestionsBySurvey&idSurvey=${idSurvey}&idDimension=${idDimension}`);
}
function saveDataSuppliertApi(data) {
  return intance.post('Supplier?action=save', data);
}

export {
  getDataSuppliertApi,
  getDataCallSuppliertApi,
  getDataQuestionsBySurverrApi,
  saveDataCallBySupplierApi,
  saveDataSuppliertApi,
};
