import instance from './instance';

function getServicesApi() {
  return instance.get('Service?action=getAll');
}
function saveServiceApi(data) {
  return instance.post('Service?action=save', data);
}
function deleteServiceApi(data) {
  const { id } = data;
  return instance.get(`Service?action=delete&id=${id}`);
}

function getItemByServiceApi(id) {
  return instance.get(`Item?action=getItemByService&idService=${id}`);
}
function saveItemApi(data) {
  return instance.post('Item?action=save', data);
}
function deleteItemApi(data) {
  const { id } = data;
  return instance.get(`Item?action=delete&id=${id}`);
}

export {
  getServicesApi,
  saveServiceApi,
  deleteServiceApi,
  getItemByServiceApi,
  saveItemApi,
  deleteItemApi,
};
