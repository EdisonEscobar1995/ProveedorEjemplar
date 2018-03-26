import instance from './instance';

function getAccessesApi() {
  return instance.get('Access?action=getAll');
}
function saveAccessApi(data) {
  return instance.post('Access?action=save', data);
}
function deleteAccessApi(data) {
  const { id } = data;
  return instance.get(`Access?action=delete&id=${id}`);
}

export {
  getAccessesApi,
  saveAccessApi,
  deleteAccessApi,
};
