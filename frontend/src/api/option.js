import instance from './instance';

const getOptionByQuestionApi = id => instance.get(`Option?action=getOptionsByQuestion&idQuestion=${id}`);

const saveOptionsApi = data => instance.post('Option?action=save', data);

export {
  getOptionByQuestionApi,
  saveOptionsApi,
};
