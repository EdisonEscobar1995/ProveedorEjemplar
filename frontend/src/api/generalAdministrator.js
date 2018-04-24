import instance from './instance';

function getGeneralAdministratorApi() {
  return instance.get('System?action=getConfiguration');
}

export default getGeneralAdministratorApi;
