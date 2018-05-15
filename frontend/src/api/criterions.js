import instance from './instance';

const getAllCriterionsByDimensionApi = idDimension => instance.get(`Criterion?action=getAll&idDimension=${idDimension || ''}`);

const saveDataCriterionApi = data => instance.post('Criterion?action=save', data);

const deleteDataCriterionApi = data => instance.get('Criterion?action=delete', {
  params: { id: data.id },
});

export {
  getAllCriterionsByDimensionApi,
  saveDataCriterionApi,
  deleteDataCriterionApi,
};
