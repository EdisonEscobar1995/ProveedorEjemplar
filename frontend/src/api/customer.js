import intance from './instance';

const saveCustomerApi = data => intance.post('Customer?action=save', data);

const deleteCustomerApi = data => intance.get(`Customer?action=delete&id=${data}`);

export {
  saveCustomerApi,
  deleteCustomerApi,
};
