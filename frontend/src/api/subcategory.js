import instance from './instance';
import instanceService from './instanceService';

function getDataSubCategoryByCategoryApi(idCategory) {
  // return instance.get(`SubCategory?action=getAll&idCategory=${idCategory}`);
  return instanceService.get(`xaServicios.xsp?Open&action=getAllSubCategory&idCategory=${idCategory}`);
}

function getSubcategoryByCategoryApi(id) {
  return instance.get(`SubCategory?action=getByIdCategory&idCategory=${id}`);
}

function saveSubcategoryApi(data) {
  return instance.post('SubCategory?action=save', data);
}

function deleteSubcategoryApi(data) {
  const { id } = data;
  return instance.get(`SubCategory?action=delete&id=${id}`);
}

export {
  getDataSubCategoryByCategoryApi,
  getSubcategoryByCategoryApi,
  saveSubcategoryApi,
  deleteSubcategoryApi,
};
