import instance from './instance';

function getGeneralAdministratorApi() {
  return instance.get('System?action=getConfiguration');
}

function saveGeneralAdministratorApi(data) {
  return instance.post('System?action=save', data);
}

export {
  getGeneralAdministratorApi,
  saveGeneralAdministratorApi,
};
