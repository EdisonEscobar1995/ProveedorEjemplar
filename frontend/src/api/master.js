import intance from './instance';

const getMasterApi = masters => intance.get(`MasterList?action=get&${masters.join('&')}`);

export {
  getMasterApi as default,
};
