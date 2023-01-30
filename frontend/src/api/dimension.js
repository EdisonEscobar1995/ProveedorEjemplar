import instance from './instance';
import instanceService from './instanceService';

const getDataDimensionApi = () => instance.get('Dimension?action=getAll');

const saveDataDimensionApi = data => instance.post('Dimension?action=save', data);

const deleteDataDimensionApi = data => instance.get('Dimension?action=delete', {
  params: { id: data.id },
});

function getDimensionsBySurveyApi(idSurvey) {
  // return instance.get(`Dimension?action=getDimensionsBySurvey&idSurvey=${idSurvey}`);
  return instanceService.get(`xaServicios.xsp?Open&action=getDimensionsBySurvey&idSurvey=${idSurvey}`);
}

export {
  getDataDimensionApi,
  getDimensionsBySurveyApi,
  saveDataDimensionApi,
  deleteDataDimensionApi,
};
