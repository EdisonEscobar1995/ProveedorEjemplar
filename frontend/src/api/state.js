// import intance from './instance';
import instanceService from './instanceService';

function getDataStateApi(idState) {
  // return intance.get(`State?action=get&id=${idState}`);
  return instanceService.get(`xaServicios.xsp?Open&action=getState&id=${idState}`);
}

export default getDataStateApi;

