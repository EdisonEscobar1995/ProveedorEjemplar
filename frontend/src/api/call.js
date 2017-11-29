import instance from './instance';

const getCallApi = () => instance.get('Call?action=getAll');

const getCallByIdApi = id => instance.get('Call?action=get', {
  params: { id },
});

const saveCallApi = data => instance.post('Call?action=save', data);

const getSuppliersByCallApi = id => instance.get(`Call?action=getSuppliersInCall&idCall=${id}`);

function sendInvitationApi(supplier) {
  return instance.post('Supplier?action=sendInvitation', supplier);
}

export {
  getCallApi,
  saveCallApi,
  getCallByIdApi,
  getSuppliersByCallApi,
  sendInvitationApi,
};
