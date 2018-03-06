import instance from './instance';

function getSuppliesApi() {
  return instance.get('Supply?action=getAll');
}

function saveSupplyApi(data) {
  return instance.post('Supply?action=save', data);
}

function deleteSupplyApi(data) {
  const { id } = data;
  return instance.get(`Supply?action=delete&id=${id}`);
}

export {
  getSuppliesApi,
  saveSupplyApi,
  deleteSupplyApi,
};
