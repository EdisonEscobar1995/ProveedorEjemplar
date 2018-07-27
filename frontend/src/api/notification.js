import instance from './instance';

const saveNotificationApi = data => instance.post('Notification?action=save', data);

const getNotificationApi = () => instance.get('Notification?action=getAll');

const getNotificationByIdApi = id => instance.get('Notification?action=get', {
  params: { id },
});

export {
  saveNotificationApi,
  getNotificationApi,
  getNotificationByIdApi,
};
