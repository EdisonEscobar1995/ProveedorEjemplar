import intance from './instance';

function getDataSuppliertApi() {
  return intance.get('Supplier?action=getAll');
}
function saveDataSupplierApi(data) {
  return intance.post('Supplier?action=save', data);
}
function updateDataSupplierApi(data) {
  return intance.post('Supplier?action=update', data);
}

export {
  getDataSuppliertApi as default,
  saveDataSupplierApi,
  updateDataSupplierApi,
};
