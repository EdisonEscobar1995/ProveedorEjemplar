import instance from './instance';

function getMenuApi() {
  return instance.get('Menu?action=getAll');
}
function saveMenuApi(data) {
  return instance.post('Menu?action=save', data);
}
function deleteMenuApi(data) {
  const { id } = data;
  return instance.get(`Menu?action=delete&id=${id}`);
}

export {
  getMenuApi,
  saveMenuApi,
  deleteMenuApi,
};

