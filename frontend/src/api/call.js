import intance from './instance';

const getCallApi = () => intance.get('Call?action=getAll');

const saveCallApi = data => intance.post('Call?action=save', data);

export {
  getCallApi,
  saveCallApi,
};
