import intance from './instance';

const saveManagerTeamAnswerApi = data => intance.post('ManagerTeamAnswer?action=save', data);

export default {
  saveManagerTeamAnswerApi,
};
