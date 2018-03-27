import instance from './instance';

function getAccessByRolApi() {
  return instance.get('AccessByRol?action=getAll');
}
function saveAccessByRolApi(data) {
  return instance.post('AccessByRol?action=save', data);
}
function deleteAccessByRolApi(data) {
  const { id } = data;
  return instance.get(`AccessByRol?action=delete&id=${id}`);
}

export {
  getAccessByRolApi,
  saveAccessByRolApi,
  deleteAccessByRolApi,
};
