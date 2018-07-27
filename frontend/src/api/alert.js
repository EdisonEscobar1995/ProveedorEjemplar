import instance from './instance';

const getAlertApi = () => instance.get('Alert?action=getAll');

const saveAlertApi = data => instance.post('Alert?action=save', data);

export {
  getAlertApi,
  saveAlertApi,
};
