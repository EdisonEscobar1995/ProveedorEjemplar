import instance from './instance';
import instanceService from './instanceService';

function getDataCategoryBySuplyApi(idSupply) {
  // return instance.get(`Category?action=getAll&idSupply=${idSupply}`);
  return instanceService.get(`xaServicios.xsp?Open&action=getAllCategory&idSupply=${idSupply}`);
}

function getCategoryBySupplyApi(id) {
  return instance.get(`Category?action=getByIdSupply&idSupply=${id}`);
}

function saveCategoryApi(data) {
  return instance.post('Category?action=save', data);
}

function deleteCategoryApi(data) {
  const { id } = data;
  return instance.get(`Category?action=delete&id=${id}`);
}

export {
  getDataCategoryBySuplyApi,
  getCategoryBySupplyApi,
  saveCategoryApi,
  deleteCategoryApi,
};
