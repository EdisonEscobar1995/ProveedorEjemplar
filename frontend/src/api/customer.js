import intance from './instance';

const getCustomerApi = () => intance.get('Customer?action=getAll');

const deleteCustomerApi = data => intance.get(`Customer?action=delete&id=${data}`);

export {
  getCustomerApi,
  deleteCustomerApi,
};
