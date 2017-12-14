import intance from './instance';

const getAnswerApi = () => intance.get('Answer?action=getAll');

const saveAnswerApi = data => intance.post('Answer?action=save', data);

const deleteMasiveAnswersApi = data => intance.post('Answer?action=deleteMasive', data);

export {
  getAnswerApi,
  saveAnswerApi,
  deleteMasiveAnswersApi,
};
