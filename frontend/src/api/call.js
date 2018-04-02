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
  `&supply=${data.supply || ''}` +
  `&category=${data.category || ''}` +
  `&companySize=${data.companySize || ''}` +
  `&supplier=${data.supplier || ''}` +
  `&dimension=${data.dimension || ''}` +
  `&criterion=${data.criterion || ''}` +
  `&service=${data.service || ''}` +
  `&item=${data.item || ''}` +
  `&country=${data.country || ''}
`);

const getSupplierSelectionApi = type => instance.get(`Call?action=getSuppliersForSelection&stage=${type}`);

const getTechnicalTeamSurveyApi = year => instance.get(`Call?action=getParticipantsToTechnicalTeam&year=${year || ''}`);

const getManagerTeamSurveyApi = year => instance.get(`Call?action=getParticipantsToManagerTeam&year=${year || ''}`);

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
};
