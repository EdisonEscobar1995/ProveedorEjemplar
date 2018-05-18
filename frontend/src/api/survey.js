import instance from './instance';

const getAllDataSurveyApi = () => instance.get('Survey?action=getAll');

const getSurveyByIdApi = id => instance.get(`Survey?action=get&id=${id}`);

const saveSurveyApi = data => instance.post('Survey?action=save', data);

const deleteSurveyApi = data => instance.get(`Survey?action=delete&id=${data.id}`);

export {
  getAllDataSurveyApi,
  getSurveyByIdApi,
  saveSurveyApi,
  deleteSurveyApi,
};
