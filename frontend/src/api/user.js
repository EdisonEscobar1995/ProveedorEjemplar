import instance from './instance';

const getUserContextApi = () => instance.get('User?action=getUserContext');

function getUsersApi() {
  return instance.get('User?action=getAll');
}
function saveUserApi(data) {
  return instance.post('User?action=save', data);
}
function deleteUserApi(data) {
  const { id } = data;
  return instance.get(`User?action=delete&id=${id}`);
}

export {
  getUserContextApi,
  getUsersApi,
  saveUserApi,
  deleteUserApi,
};

