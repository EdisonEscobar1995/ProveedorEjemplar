import intance from './instance';

const getAttachmentApi = () => intance.get('Attachment?action=getAll');

const deleteAttachmentApi = data => intance.get(`Attachment?action=delete&id=${data}`);

export {
  getAttachmentApi,
  deleteAttachmentApi,
};
