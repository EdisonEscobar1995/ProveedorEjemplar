import intance from './instance';

function getDataSuppliertApi() {
  return intance.get('Supplier?action=getAll');
}
function saveDataSupplierApi(data) {
  return intance.post('Supplier?action=save', data);
}

export {
  getDataSuppliertApi as default,
  saveDataSupplierApi,
};
