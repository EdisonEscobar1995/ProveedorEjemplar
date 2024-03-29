import asyncComponent from './AsyncComponent';

const index = -1;

const increment = () => index + 1;

const routes = [
  {
    index: increment(),
    name: 'HOME',
    path: '/',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Home').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SUPPLIER',
    path: '/supplier',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Supplier').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SUPPLIER_BY_ID',
    path: '/supplier/:idSupplier/:idSupplierByCall',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Supplier').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'CALL',
    path: '/call',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Call').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'CALL_FORM',
    path: '/call/form',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/CallForm').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'CALL_BY_ID',
    path: '/call/form/:id',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/CallForm').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'MODIFIED_SUPPLIERS',
    path: '/modifiedSuppliers',
    exact: true,
    component: asyncComponent(() =>
     import('./pages/ModifiedSuppliers').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SURVEYS',
    path: '/surveys',
    exact: true,
    component: asyncComponent(() =>
     import('./pages/Surveys').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'CALLREPORT',
    path: '/callReport',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/CallReport').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SUPPLIERREPORT',
    path: '/supplierReport',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/SupplierReport').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'MANAGERREPORT',
    path: '/managerReport',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/ManagerReport').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'RESULTS',
    path: '/results',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Results').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'PENDINGS',
    path: '/pendings',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Pendings').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'TECHNICALTEAMSURVEY',
    path: '/technicalTeamSurvey',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/TechnicalTeamSurvey').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'ENDEDSUPPLIER',
    path: '/endedSupplier',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/EndedSupplier').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'ENDEDEVALUATOR',
    path: '/endedEvaluator',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/EndedEvaluator').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'ENDEDTECHNICALTEAM',
    path: '/endedTechnicalTeam',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/EndedTechnicalTeam').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'ACCESS',
    path: '/access',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Access').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'ACCESSBYROL',
    path: '/accessByRol',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/AccessByRol').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SECTOR',
    path: '/sector',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Sector').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SERVICE',
    path: '/service',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Service').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'EVALUATIONSCALE',
    path: '/evaluationScale',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/EvaluationScale').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'USER',
    path: '/user',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/User').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SUPPLY',
    path: '/supply',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Supply').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'TECHNICALTEAM',
    path: '/technicalTeam',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/TechnicalTeam').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'MANAGERTEAMSURVEY',
    path: '/managerTeamSurvey',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/ManagerTeamSurvey').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'MANAGERTEAM',
    path: '/managerTeam',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/ManagerTeam').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'MENU',
    path: '/menu',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Menu').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'GENERALADMINISTRATOR',
    path: '/generalAdmon',
    exact: true,
    component: asyncComponent(() =>
     import('./pages/GeneralAdministrator').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'MANAGER_BY_ID',
    path: '/managerTeamSurvey/:idSupplier',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/ManagerTeamSurvey').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'TECHNICAL_BY_ID',
    path: '/technicalTeamSurvey/:idSupplier',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/TechnicalTeamSurvey').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'NOTIFICATION',
    path: '/notification',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Notification').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'COMPANY_TYPE',
    path: '/companyType',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/CompanyType').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SOCIETY_TYPE',
    path: '/societyType',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/SocietyType').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'DIMENSION_CRITERION',
    path: '/dimension',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/DimensionAndCriterion').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'QUESTION',
    path: '/question',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Question').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'QUESTION_FORM',
    path: '/question/form',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/QuestionForm').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'QUESTION_BY_ID',
    path: '/question/form/:id',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/QuestionForm').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SURVEY_ADMON',
    path: '/surveyAdmon',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/SurveyAdmon').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SURVEY_ADMON_FORM',
    path: '/surveyAdmon/form',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/SurveyAdmonForm').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'SURVEY_ADMON_BY_ID',
    path: '/surveyAdmon/form/:id',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/SurveyAdmonForm').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'COMPANY_SIZE',
    path: '/companySize',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/CompanySize').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'ALERT',
    path: '/alert',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Alert').then(module => module.default),
    ),
  },
  {
    index: increment(),
    name: 'DICTIONARY',
    path: '/dictionary',
    exact: true,
    component: asyncComponent(() =>
      import('./pages/Dictionary').then(module => module.default),
    ),
  },
];

export default routes;
