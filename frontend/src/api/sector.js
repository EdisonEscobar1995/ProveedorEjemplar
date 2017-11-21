import intance from './instance';

function getAllSectorApi() {
  return intance.get('Sector?action=getAll');
}
function saveSectorApi(data) {
  return intance.post('Sector?action=save', data);
}
function deleteSectorApi(data) {
  const { id } = data;
  return intance.get(`Sector?action=delete&id=${id}`);
}

export {
  getAllSectorApi,
  saveSectorApi,
  deleteSectorApi,
};
