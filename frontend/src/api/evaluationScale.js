import intance from './instance';

function getEvaluationScalesApi() {
  return intance.get('EvaluationScale?action=getAll');
}
function saveEvaluationScaleApi(data) {
  return intance.post('EvaluationScale?action=save', data);
}
function deleteEvaluationScaleApi(data) {
  const { id } = data;
  return intance.get(`EvaluationScale?action=delete&id=${id}`);
}

export {
  getEvaluationScalesApi,
  saveEvaluationScaleApi,
  deleteEvaluationScaleApi,
};
