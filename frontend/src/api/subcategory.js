import instance from './instance';

function getDataSubCategoryByCategoryApi(idCategory) {
  return instance.get(`SubCategory?action=getAll&idCategory=${idCategory}`);
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
