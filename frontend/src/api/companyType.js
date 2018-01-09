import intance from './instance';

function getDataCompanyTypesApi() {
  return intance.get('CompanyType?action=getAll');
}
function saveDataCompanyTypeApi(data) {
  return intance.post('CompanyType?action=save', data);
}

export {
  getDataCompanyTypesApi as default,
  saveDataCompanyTypeApi,
};
