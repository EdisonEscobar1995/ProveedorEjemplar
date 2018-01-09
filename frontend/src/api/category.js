import intance from './instance';

function getDataCategoryApi() {
  return intance.get('Category?action=getAll');
}
function getDataCategoryBySuplyApi(idSupply) {
  return intance.get(`Category?action=getAll&idSupply=${idSupply}`);
}
function saveDataCategoryApi(data) {
  return intance.post('Category?action=save', data);
}

export {
  getDataCategoryApi,
  saveDataCategoryApi,
  getDataCategoryBySuplyApi,
};
