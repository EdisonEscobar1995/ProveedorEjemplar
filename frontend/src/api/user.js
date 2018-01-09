import instance from './instance';

const getUserContextApi = () => instance.get('User?action=getUserContext');

export default getUserContextApi;
