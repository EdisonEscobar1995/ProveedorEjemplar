import intance from './instance';

function getDataQuestion() {
  return intance.get('Question?action=getAll');
}

export {
  getDataQuestion as default,
};
