import intance from './instance';

function getDataDepartmentsByCountryApi(data) {
  const { id } = data;
  return intance.get(`Department?action=getAll&idCountry=${id}`);
}
export default getDataDepartmentsByCountryApi;
