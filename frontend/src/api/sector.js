import intance from './instance';

function getDataSectortApi() {
  return intance.get('Sector?action=getAll');
}
function saveDataSectorApi(data) {
  return intance.post('Sector?action=save', data);
}
function updateDataSectorApi(data) {
  return intance.post('Sector?action=update', data);
}

export {
  getDataSectortApi as default,
  saveDataSectorApi,
  updateDataSectorApi,
};
