import instance from './instance';

const getAllDataQuestionApi = () => instance.get('Question?action=getAll');

const getQuestionByIdApi = id => instance.get(`Question?action=get&id=${id}`);

const saveQuestionApi = data => instance.post('Question?action=save', data);

const deleteQuestionApi = data => instance.get(`Question?action=delete&id=${data.id}`);

const getQuestionsByIdDimensionApi = idDimension => instance.get(`Question?action=getAll&idDimension=${idDimension}`);

export {
  getAllDataQuestionApi,
  getQuestionByIdApi,
  saveQuestionApi,
  deleteQuestionApi,
  getQuestionsByIdDimensionApi,
};
