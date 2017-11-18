import intance from './instance';

function getDataAgreementApi() {
  return intance.post('agreementsByCategoryRandom');
}

function getDataSearchAgreementApi(data) {
  return intance.post('searchAgreement', data);
}

export {
  getDataAgreementApi as default,
  getDataSearchAgreementApi,
};
