import instance from './instance';

function getTechnicalTeamApi() {
  return instance.get('TechnicalTeam?action=getAll');
}
function saveTechnicalTeamApi(data) {
  return instance.post('TechnicalTeam?action=save', data);
}
function deleteTechnicalTeamApi(data) {
  const { id } = data;
  return instance.get(`TechnicalTeam?action=delete&id=${id}`);
}

export {
  getTechnicalTeamApi,
  saveTechnicalTeamApi,
  deleteTechnicalTeamApi,
};

