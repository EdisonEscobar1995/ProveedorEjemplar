import instance from './instance';

function getManagerTeamApi() {
  return instance.get('ManagerTeam?action=getAll');
}
function saveManagerTeamApi(data) {
  return instance.post('ManagerTeam?action=save', data);
}
function deleteManagerTeamApi(data) {
  const { id } = data;
  return instance.get(`ManagerTeam?action=delete&id=${id}`);
}

export {
  getManagerTeamApi,
  saveManagerTeamApi,
  deleteManagerTeamApi,
};

