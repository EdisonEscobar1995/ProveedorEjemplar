import intance from './instance';

const getCallApi = () => intance.get('Call?action=getAll');

const getCallByIdApi = id => intance.get('Call?action=get', {
  params: { id },
});

const saveCallApi = data => intance.post('Call?action=save', data);

export {
  getCallApi,
  saveCallApi,
  getCallByIdApi,
};
