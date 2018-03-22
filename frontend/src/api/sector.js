import instance from './instance';

function getSectorsApi() {
  return instance.get('Sector?action=getAll');
}
function saveSectorApi(data) {
  return instance.post('Sector?action=save', data);
}
function deleteSectorApi(data) {
  const { id } = data;
  return instance.get(`Sector?action=delete&id=${id}`);
}

export {
  getSectorsApi,
  saveSectorApi,
  deleteSectorApi,
};
