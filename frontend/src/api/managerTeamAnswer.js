import instance from './instance';

const saveManagerTeamAnswerApi = data => instance.post('ManagerTeamAnswer?action=save', data);

export default saveManagerTeamAnswerApi;
