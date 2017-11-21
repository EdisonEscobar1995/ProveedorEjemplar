import intance from './instance';

function getDataSubCategoryApi() {
  return intance.get('SubCategory?action=getAll');
}
function getDataSubCategoryByCategoryApi(data) {
  const { id } = data;
  return intance.get(`SubCategory?action=getAll&idCategory=${id}`);
}
function saveDataSubCategoryApi(data) {
  return intance.post('SubCategory?action=save', data);
}

export {
  getDataSubCategoryApi,
  saveDataSubCategoryApi,
  getDataSubCategoryByCategoryApi,
};
