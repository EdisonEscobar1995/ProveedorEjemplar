import instance from './instance';
import instanceService from './instanceService';

function getSuppliesApi() {
  return instance.get('Supply?action=getAll');
}

const getSuppliesSpecialsApi = () => instanceService.get('xaServicios.xsp?Open&action=getAllSuppliesSpecial');

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
  getSuppliesSpecialsApi,
};
