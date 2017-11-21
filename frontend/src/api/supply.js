import intance from './instance';

function getDataSupplyApi() {
  return intance.get('Supply?action=getAll');
}
function saveDataSupplyApi(data) {
  return intance.post('Supply?action=save', data);
}

export {
  getDataSupplyApi,
  saveDataSupplyApi,
};
