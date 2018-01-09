import intance from './instance';

function getDataCitiesByDepartmentApi(idDepartment) {
  return intance.get(`City?action=getAll&idDepartment=${idDepartment}`);
}
export default getDataCitiesByDepartmentApi;
