import intance from './instance';

function getDataCategorytApi() {
  return intance.get('Category?action=getAll');
}
function saveDataCategoryApi(data) {
  return intance.post('Category?action=save', data);
}

export {
  getDataCategorytApi as default,
  saveDataCategoryApi,
};
