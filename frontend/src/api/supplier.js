import intance from './instance';

function getDataSuppliertApi() {
  return intance.get('SupplierByCall?action=currentCall');
}
function saveDataSupplierApi(data) {
  return intance.post('SupplierByCall?action=save', data);
}

export {
  getDataSuppliertApi,
  saveDataSupplierApi,
};
