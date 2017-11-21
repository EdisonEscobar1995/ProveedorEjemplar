import intance from './instance';

function getDataSocietyTypesApi() {
  return intance.get('SocietyType?action=getAll');
}
function saveDataSocietyTypeApi(data) {
  return intance.post('SocietyType?action=save', data);
}

export {
  getDataSocietyTypesApi as default,
  saveDataSocietyTypeApi,
};
