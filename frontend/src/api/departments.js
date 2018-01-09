import intance from './instance';

function getDataDepartmentsByCountryApi(idCountry) {
  return intance.get(`Department?action=getAll&idCountry=${idCountry}`);
}
export default getDataDepartmentsByCountryApi;
