import instance from './instance';

function getDataSuppliertApi() {
  return instance.get('Supplier?action=loadInformation');
}

function getDataCallSuppliertApi() {
  return instance.get('SupplierByCall?action=currentCall');
}

function finishSurveyApi(call) {
  return instance.post('SupplierByCall?action=finishSurvey', call);
}

function saveDataCallBySupplierApi(data) {
  return instance.post('SupplierByCall?action=save', data);
}

function getDataQuestionsBySurveyApi(data) {
  const { idSurvey, idDimension } = data;
  return instance.get(`Supplier?action=getQuestionsBySurvey&idSurvey=${idSurvey}&idDimension=${idDimension}`);
}

function saveDataSuppliertApi(data) {
  return instance.post('Supplier?action=save', data);
}

function getModifiedSuppliersApi(year = '') {
  return instance.get(`Supplier?action=getModifiedSuppliers&year=${year}`);
}

function unlockSupplierApi(supplierByCall) {
  return instance.post('SupplierByCall?action=unlockSupplier', supplierByCall);
}

export {
  getDataSuppliertApi,
  getDataCallSuppliertApi,
  getDataQuestionsBySurveyApi,
  saveDataCallBySupplierApi,
  saveDataSuppliertApi,
  getModifiedSuppliersApi,
  unlockSupplierApi,
  finishSurveyApi,
};
