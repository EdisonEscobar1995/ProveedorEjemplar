import intance from './instance';

function getDataCountriesApi() {
  return intance.get('Country?action=getAll');
}
export default getDataCountriesApi;
