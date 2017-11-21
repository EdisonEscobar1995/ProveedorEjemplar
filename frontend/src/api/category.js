import intance from './instance';

function getDataCategoryApi() {
  return intance.get('Category?action=getAll');
}
function getDataCategoryBySuplyApi(data) {
  const { id } = data;
  return intance.get(`Category?action=getAll&idSupply=${id}`);
}
function saveDataCategoryApi(data) {
  return intance.post('Category?action=save', data);
}

export {
  getDataCategoryApi,
  saveDataCategoryApi,
  getDataCategoryBySuplyApi,
};
