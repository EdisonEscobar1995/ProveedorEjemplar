import intance from './instance';

function getCriterionsByDimensionApi(idDimension) {
  return intance.get(`Criterion?action=getAll&idDimension=${idDimension || ''}`);
}
export default getCriterionsByDimensionApi;
