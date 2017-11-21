import intance from './instance';

function getDataCompanySizeApi() {
  return intance.get('CompanySize?action=getAll');
}
function saveDataCompanySizeApi(data) {
  return intance.post('CompanySize?action=save', data);
}

export {
  getDataCompanySizeApi,
  saveDataCompanySizeApi,
};
