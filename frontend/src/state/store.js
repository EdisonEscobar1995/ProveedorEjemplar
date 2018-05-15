import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import main from './Main/reducer';
import generic from './Generic/reducer';
import supplier from './Supplier/reducer';
import call from './Call/reducer';
import calledSuppliers from './CalledSuppliers/reducer';
import modifiedSuppliers from './ModifiedSuppliers/reducer';
import surveys from './Surveys/reducer';
import callReport from './CallReport/reducer';
import results from './Results/reducer';
import pendings from './Pendings/reducer';
import supplierSelection from './SupplierSelection/reducer';
import access from './Access/reducer';
import accessByRol from './AccessByRol/reducer';
import sector from './Sector/reducer';
import service from './Service/reducer';
import evaluationScale from './EvaluationScale/reducer';
import user from './User/reducer';
import supply from './Supply/reducer';
import technicalTeam from './TechnicalTeam/reducer';
import technicalTeamSurvey from './TechnicalTeamSurvey/reducer';
import managerTeamSurvey from './ManagerTeamSurvey/reducer';
import managerTeam from './ManagerTeam/reducer';
import menu from './Menu/reducer';
import generalAdministrator from './GeneralAdministrator/reducer';
import home from './Home/reducer';
import notification from './Notification/reducer';
import companyType from './CompanyType/reducer';
import societyType from './SocietyType/reducer';
import dimensionAndCriterion from './DimensionAndCriterion/reducer';

const app = combineReducers({
  main,
  generic,
  supplier,
  call,
  calledSuppliers,
  modifiedSuppliers,
  surveys,
  callReport,
  results,
  pendings,
  supplierSelection,
  access,
  accessByRol,
  sector,
  service,
  evaluationScale,
  user,
  supply,
  technicalTeam,
  technicalTeamSurvey,
  managerTeamSurvey,
  managerTeam,
  menu,
  generalAdministrator,
  home,
  notification,
  companyType,
  societyType,
  dimensionAndCriterion,
});

let middleware = {};

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(applyMiddleware(thunk));
} else {
  middleware = applyMiddleware(thunk);
}

export default createStore(app, middleware);
