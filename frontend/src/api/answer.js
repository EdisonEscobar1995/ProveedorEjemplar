import intance from './instance';

const getAnswerApi = () => intance.get('Answer?action=getAll');

const saveAnswerApi = data => intance.post('Answer?action=save', data);

const deleteMassiveAnswersApi = data => intance.post('Answer?action=deleteMassive', data);

export {
  getAnswerApi,
  saveAnswerApi,
  deleteMassiveAnswersApi,
};
