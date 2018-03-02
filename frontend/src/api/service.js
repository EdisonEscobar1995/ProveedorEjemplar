import intance from './instance';

function getServicesApi() {
  return intance.get('Service?action=getAll');
}
function saveServiceApi(data) {
  return intance.post('Service?action=save', data);
}
function deleteServiceApi(data) {
  const { id } = data;
  return intance.get(`Service?action=delete&id=${id}`);
}

function getItemByServiceApi(id) {
  return intance.get(`Item?action=getItemByService&idService=${id}`);
}
function saveItemApi(data) {
  return intance.post('Item?action=save', data);
}
function deleteItemApi(data) {
  const { id } = data;
  return intance.get(`Item?action=delete&id=${id}`);
}

export {
  getServicesApi,
  saveServiceApi,
  deleteServiceApi,
  getItemByServiceApi,
  saveItemApi,
  deleteItemApi,
};
