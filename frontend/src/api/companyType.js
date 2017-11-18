import intance from './instance';

function getDataCompanyTypetApi() {
  return intance.get('CompanyType?action=getAll');
}
function saveDataCompanyTypeApi(data) {
  return intance.post('CompanyType?action=save', data);
}

export {
  getDataCompanyTypetApi as default,
  saveDataCompanyTypeApi,
};
