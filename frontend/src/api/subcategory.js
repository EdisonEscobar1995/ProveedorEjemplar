import intance from './instance';

function getDataSubCategoryApi() {
  return intance.get('SubCategory?action=getAll');
}
function getDataSubCategoryByCategoryApi(idCategory) {
  return intance.get(`SubCategory?action=getAll&idCategory=${idCategory}`);
}
function saveDataSubCategoryApi(data) {
  return intance.post('SubCategory?action=save', data);
}

export {
  getDataSubCategoryApi,
  saveDataSubCategoryApi,
  getDataSubCategoryByCategoryApi,
};
