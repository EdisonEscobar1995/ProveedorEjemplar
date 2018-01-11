import instance from './instance';

function getDataSuppliertApi(id) {
  if (id && typeof id === 'string') {
    return instance.get(`Supplier?action=loadInformation&idSupplier=${id}`);
  }
  return instance.get('SupplierByCall?action=currentCall');
}

function getDataCallSuppliertApi(id) {
  if (id && typeof id === 'string') {
    return instance.get(`SupplierByCall?action=currentCall&idSupplierByCall=${id}`);
  }
  return instance.get('SupplierByCall?action=currentCall');
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

function getModifiedSuppliersApi(year = '') {
  return instance.get(`Supplier?action=getModifiedSuppliers&year=${year}`);
}

function unlockSupplierApi(supplierByCall) {
  return instance.post('SupplierByCall?action=unlockSupplier', supplierByCall);
}

function getSurveysApi(year = '') {
  return instance.get(`Supplier?action=getSurveys&year=${year}`);
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
};
