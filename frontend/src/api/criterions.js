import instance from './instance';

const getAllCriterionsByDimensionApi = idDimension => instance.get(`Criterion?action=getAll&idDimension=${idDimension || ''}`);

const getAllCriterionsApi = () => instance.get('Criterion?action=getAll');

const saveDataCriterionApi = data => instance.post('Criterion?action=save', data);

const deleteDataCriterionApi = data => instance.get('Criterion?action=delete', {
  params: { id: data.id },
});

export {
  getAllCriterionsByDimensionApi,
  getAllCriterionsApi,
  saveDataCriterionApi,
  deleteDataCriterionApi,
};
