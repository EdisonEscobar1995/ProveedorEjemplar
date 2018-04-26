import instance from './instance';

const getCallApi = () => instance.get('Call?action=getAll');

const getCallByIdApi = id => instance.get('Call?action=get', {
  params: { id },
});

const saveCallApi = data => instance.post('Call?action=save', data);

const getCalledSuppliersApi = id => instance.get('Call?action=getSuppliersInCall', {
  params: { idCall: id },
});

const sendInvitationApi = supplier => instance.post('Supplier?action=sendInvitation', supplier);

const massiveShipmentCallApi = call => instance.post('Call?action=massiveShipmentCall', call);

const getParticipantsByYearApi = year => instance.get(`Call?action=getParticipantsByYear&year=${year || ''}`);

const getResultsApi = data => instance.get(`Call?action=getResults&call=${data.call || ''}` +
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

const getSupplierSelectionApi = type => instance.get(`Call?action=getSuppliersForSelection&stage=${type}`);

const getTechnicalTeamSurveyApi = year => instance.get(`Call?action=getParticipantsToTechnicalTeam&year=${year || ''}`);

const getManagerTeamSurveyApi = year => instance.get(`Call?action=getParticipantsToManagerTeam&year=${year || ''}`);

const getStatisticalProgressApi = filter => instance.get(`Call?action=getStatisticalProgress&filterName=${filter || 'SUPPLY_FILTER'}`);

const identifyCurrentStageApi = () => instance.get('Call?action=identifyCurrentStage');

export {
  getCallApi,
  saveCallApi,
  getCallByIdApi,
  getCalledSuppliersApi,
  sendInvitationApi,
  massiveShipmentCallApi,
  getParticipantsByYearApi,
  getResultsApi,
  getSupplierSelectionApi,
  getTechnicalTeamSurveyApi,
  getManagerTeamSurveyApi,
  getStatisticalProgressApi,
  identifyCurrentStageApi,
};
