import instance from './instance';
import instanceService from './instanceService';

const getCallApi = () => instance.get('Call?action=getAll');

const getCallByIdApi = id => instance.get('Call?action=get', {
  params: { id },
});

const saveCallApi = data => instance.post('Call?action=save', data);

const deleteCallApi = id => instance.get(`Call?action=delete&id=${id}`);

/* const getCalledSuppliersApi = id => instance.get('Call?action=getSuppliersInCall', {
  params: { idCall: id },
}); */
const getCalledSuppliersApi = id => instanceService.get(`xaServicios.xsp?Open&action=getSuppliersInCall&idCall=${id}`);

const saveSuppliersToCallApi = data => instance.post('Call?action=loadSupplierToCall', data);

const sendInvitationApi = supplier => instance.post('Supplier?action=sendInvitation', supplier);

const massiveShipmentCallApi = call => instance.post('Call?action=massiveShipmentCall', call);

/* const getParticipantsByYearApi = year => instance.get(
  `Call?action=getParticipantsByYear&year=${year || ''}`
); */
const getParticipantsByYearApi = year => instanceService.get(`xaServicios.xsp?Open&action=getParticipantsByYear&year=${year || ''}`);

const getResultsApi = data => instance.get(`Call?action=getResults&idCall=${data.call || ''}` +
  `&type=${data.type || ''}` +
  `&idSupply=${data.supply || ''}` +
  `&idCategory=${data.category || ''}` +
  `&idCompanySize=${data.companySize || ''}` +
  `&id=${data.supplier || ''}` +
  `&idDimension=${data.dimension || ''}` +
  `&idCriterion=${data.criterion || ''}` +
  `&service=${data.service || ''}` +
  `&item=${data.item || ''}` +
  `&idCountry=${data.country || ''}
`);

const getManagerReportApi = data => instance.get(`Call?action=getManagerReport&idCall=${data.call || ''}` +
  `&idDimension=${data.dimension || ''}` +
  `&idCriterion=${data.criterion || ''}
`);

const getSupplierSelectionApi = type => instance.get(`Call?action=getSuppliersForSelection&stage=${type}`);

const getTechnicalTeamSurveyApi = year => instance.get(`Call?action=getParticipantsToTechnicalTeam&year=${year || ''}`);

const getManagerTeamSurveyApi = year => instance.get(`Call?action=getParticipantsToManagerTeam&year=${year || ''}`);

// const getStatisticalProgressApi = filter => 
// instance.get(`Call?action=getStatisticalProgress&filterName=${filter || 'SUPPLY_FILTER'}`);
const getStatisticalProgressApi = filter => instanceService.get(`xaServicios.xsp?Open&action=getStatisticalProgress&filterName=${filter || 'SUPPLY_FILTER'}`);

const identifyCurrentStageApi = () => instance.get('Call?action=identifyCurrentStage');

export {
  getCallApi,
  saveCallApi,
  deleteCallApi,
  getCallByIdApi,
  getCalledSuppliersApi,
  sendInvitationApi,
  saveSuppliersToCallApi,
  massiveShipmentCallApi,
  getParticipantsByYearApi,
  getResultsApi,
  getManagerReportApi,
  getSupplierSelectionApi,
  getTechnicalTeamSurveyApi,
  getManagerTeamSurveyApi,
  getStatisticalProgressApi,
  identifyCurrentStageApi,
};
