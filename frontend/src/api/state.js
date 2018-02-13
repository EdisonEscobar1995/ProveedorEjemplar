import intance from './instance';

function getDataStateApi(idState) {
  return intance.get(`State?action=get&id=${idState}`);
}

export default getDataStateApi;

