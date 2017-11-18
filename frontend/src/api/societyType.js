import intance from './instance';

function getDataSocietyTypetApi() {
  return intance.get('SocietyType?action=getAll');
}
function saveDataSocietyTypeApi(data) {
  return intance.post('SocietyType?action=save', data);
}

export {
  getDataSocietyTypetApi as default,
  saveDataSocietyTypeApi,
};
