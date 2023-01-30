// import intance from './instance';
import instanceService from './instanceService';

function getDataDepartmentsByCountryApi(idCountry) {
  // return intance.get(`Department?action=getAll&idCountry=${idCountry}`);
  return instanceService.get(`xaServicios.xsp?Open&action=getAllDepartment&idCountry=${idCountry}`);
}
export default getDataDepartmentsByCountryApi;
