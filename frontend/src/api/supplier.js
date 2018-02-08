import instance from './instance';

function getDataSuppliertApi(id = '') {
  return instance.get(`Supplier?action=loadInformation&idSupplier=${id !== null ? id : ''}`);
}

function getDataCallSuppliertApi(id = '') {
  return instance.get(`SupplierByCall?action=loadCallOfSupplier&idSupplierByCall=${id !== null ? id : ''}`);
}

function finishSurveyApi(call) {
  return instance.post('SupplierByCall?action=finishSurvey', call);
}

function saveDataCallBySupplierApi(data) {
  return instance.post('SupplierByCall?action=save', data);
}

function getDataQuestionsBySurveyApi(data) {
  const { idSurvey, idDimension, id } = data;
  return instance.get(`Supplier?action=getQuestionsBySurvey&idSurvey=${idSurvey}&idDimension=${idDimension}&idSupplierByCall=${id}`);
}

function saveDataSuppliertApi(data) {
  return instance.post('Supplier?action=save', data);
}

function getModifiedSuppliersApi(year) {
  return instance.get(`Supplier?action=getModifiedSuppliers&year=${year || ''}`);
}

function unlockSupplierApi(supplierByCall) {
  return instance.post('SupplierByCall?action=unlockSupplier', supplierByCall);
}

function getSurveysApi(year) {
  return instance.get(`Supplier?action=getSurveys&year=${year || ''}`);
}

function getPendingsApi(year) {
  return instance.get(`Supplier?action=getSurveys&year=${year || ''}`);
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
  getSurveysApi,
  getPendingsApi,
};
