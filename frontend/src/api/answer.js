import intance from './instance';

const getAnswerApi = () => intance.get('Answer?action=getAll');

const saveAnswerApi = data => intance.post('Answer?action=save', data);

const deleteAnswersApi = data => intance.post('Answer?action=delete', data);

export {
  getAnswerApi,
  saveAnswerApi,
  deleteAnswersApi,
};
