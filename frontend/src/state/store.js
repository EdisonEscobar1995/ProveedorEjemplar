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
import endedEvaluator from './EndedEvaluator/reducer';
import sector from './Sector/reducer';
import service from './Service/reducer';

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
  endedEvaluator,
  sector,
  service,
});

let middleware = {};

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(applyMiddleware(thunk));
} else {
  middleware = applyMiddleware(thunk);
}

export default createStore(app, middleware);
