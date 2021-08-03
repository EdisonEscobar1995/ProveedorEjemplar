// eslint-disable-next-line no-unused-vars
import intance from './instance';
import instanceService from './instanceService';

// const getMasterApi = masters => intance.get(`MasterList?action=get&${masters.join('&')}`);
const getMasterApi = masters => instanceService.get(`xaServicios.xsp?Open&action=getMasterList&${masters.join('&')}`);

export {
  getMasterApi as default,
};
