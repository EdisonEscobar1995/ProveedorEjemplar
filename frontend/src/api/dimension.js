import intance from './instance';

function getDataDimension() {
  return intance.get('Dimension?action=getAll');
}
function getDimensionsBySurveyApi(idSurvey) {
  return intance.get(`Dimension?action=getDimensionsBySurvey&idSurvey=${idSurvey}`);
}

export {
  getDataDimension,
  getDimensionsBySurveyApi,
};
