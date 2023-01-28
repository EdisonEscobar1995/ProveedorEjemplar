import instance from './instance';
import instanceService from './instanceService';

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

function deleteDataCallBySupplierApi(id) {
  return instance.get(`SupplierByCall?action=delete&id=${id}`);
}

function getDataQuestionsBySurveyApi(data) {
  const { idSurvey, idDimension, id } = data;
  // return instance.get(`Supplier?action=getQuestionsBySurvey&idSurvey=
  // ${idSurvey}&idDimension=${idDimension}&idSupplierByCall=${id}`);
  return instanceService.get(`xaServicios.xsp?Open&action=getQuestionsBySurvey&idSurvey=${idSurvey || ''}&idDimension=${idDimension || ''}&idSupplierByCall=${id || ''}`);
}

function getReportBySupplierApi(data) {
  const { idCall, idSupplier, idSurvey } = data;
  return instance.get(`Supplier?action=getReportBySupplier&idCall=${idCall}&idSupplier=${idSupplier}&idSurvey=${idSurvey}`);
}

function saveDataSuppliertApi(data) {
  return instance.post('Supplier?action=save', data);
}

function getSuppliersByKeyApi(text) {
  return instance.get(`Supplier?action=searchSupplier&text=${text}`);
}

function getModifiedSuppliersApi(year) {
  // return instance.get(`Supplier?action=getModifiedSuppliers&year=${year || ''}`);
  return instanceService.get(`xaServicios.xsp?Open&action=getModifiedSuppliers&year=${year || ''}`);
}

function unlockSupplierApi(supplierByCall) {
  return instance.post('SupplierByCall?action=unlockSupplier', supplierByCall);
}

function getSurveysApi(year) {
  // return instance.get(`Supplier?action=getSurveys&year=${year || ''}`);
  return instanceService.get(`xaServicios.xsp?Open&action=getSurveys&year=${year || ''}`);
}

function getPendingsApi(year) {
  return instance.get(`Supplier?action=pendingToQualify&year=${year || ''}`);
}

function sendApprovalsApi(data) {
  return instance.post('SupplierToNextStage?action=approveToNextStage', data);
}

function createCopyOfSupplieyByCallSpecialApi(data) {
  const datos = new FormData();
  datos.append('data', JSON.stringify({
    ...data,
  }));
  return instanceService.post('xaServicios.xsp?Open&action=createCopyOfSupplieyByCallSpecial', datos);
}

function sendRejectionsApi(data) {
  return instance.post('SupplierToNextStage?action=dontApproveToNextStage', data);
}

function finishTechnicalTeamSurveyApi(data) {
  return instance.post('SupplierToNextStage?action=finishSurveyMassive', data);
  // return instance.post('SupplierToNextStage?action=finishTechnicalTeamSurvey', data);
}

function finishManagerTeamSurveyApi() {
  return instance.get('SupplierToNextStage?action=finishSurveyManagerTeam&year=2018');
}

export {
  getDataSuppliertApi,
  getDataCallSuppliertApi,
  getDataQuestionsBySurveyApi,
  getReportBySupplierApi,
  saveDataCallBySupplierApi,
  saveDataSuppliertApi,
  deleteDataCallBySupplierApi,
  getModifiedSuppliersApi,
  unlockSupplierApi,
  finishSurveyApi,
  getSurveysApi,
  getPendingsApi,
  sendApprovalsApi,
  createCopyOfSupplieyByCallSpecialApi,
  getSuppliersByKeyApi,
  sendRejectionsApi,
  finishTechnicalTeamSurveyApi,
  finishManagerTeamSurveyApi,
};
