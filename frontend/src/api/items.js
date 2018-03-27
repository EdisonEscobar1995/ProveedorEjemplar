import intance from './instance';

function getItemsByServiceApi(idService) {
  return intance.get(`Item?action=getAll&idService=${idService || ''}`);
}
export default getItemsByServiceApi;
