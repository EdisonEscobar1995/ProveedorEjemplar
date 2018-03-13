import intance from './instance';

const saveTechnicalTeamAnswerApi = data => intance.post('TechnicalTeamAnswer?action=save', data);

const saveTechnicalTeamCommentApi = data => intance.post('TechnicalTeamComment?action=save', data);

export {
  saveTechnicalTeamAnswerApi,
  saveTechnicalTeamCommentApi,
};

