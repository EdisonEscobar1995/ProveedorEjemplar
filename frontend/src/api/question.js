import intance from './instance';

function getDataQuestion() {
  return intance.get('Question?action=getAll');
}
function getQuestionsByDimensionApi(idDimension) {
  return intance.get(`Question?action=getQuestionsBySurvey&idDimension=${idDimension}`);
}

export {
  getDataQuestion,
  getQuestionsByDimensionApi,
};
