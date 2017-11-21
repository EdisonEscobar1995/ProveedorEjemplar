import intance from './instance';

function getDataCitiesByDepartmentApi(data) {
  const { id } = data;
  return intance.get(`City?action=getAll&idDepartment=${id}`);
}
export default getDataCitiesByDepartmentApi;
