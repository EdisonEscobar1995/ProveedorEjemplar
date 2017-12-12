import instance from './instance';

const getMenuByRolApi = () => instance.get('Menu?action=getMenusByRol');

export default getMenuByRolApi;
