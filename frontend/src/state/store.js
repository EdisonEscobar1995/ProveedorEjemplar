import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './User/reducer';
import generic from './Generic/reducer';
import sector from './Sector/reducer';
import supplier from './Supplier/reducer';
import call from './Call/reducer';
import calledSuppliers from './CalledSuppliers/reducer';
import modifiedSuppliers from './ModifiedSuppliers/reducer';

const app = combineReducers({
  user,
  generic,
  sector,
  supplier,
  call,
  calledSuppliers,
  modifiedSuppliers,
});

let middleware = {};

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(applyMiddleware(thunk));
} else {
  middleware = applyMiddleware(thunk);
}

export default createStore(app, middleware);
