// import intance from './instance';
import instanceService from './instanceService';

function getDataCitiesByDepartmentApi(idDepartment) {
  // return intance.get(`City?action=getAll&idDepartment=${idDepartment}`);
  return instanceService.get(`xaServicios.xsp?Open&action=getAllCity&idDepartment=${idDepartment}`);
}
export default getDataCitiesByDepartmentApi;
