import instance from './instance';

function getRolessApi() {
  return instance.get('Rol?action=getAll');
}

export default getRolessApi;
