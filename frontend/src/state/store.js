import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import generic from './Generic/reducer';
import sector from './Sector/reducer';
import supplier from './Supplier/reducer';
import call from './Call/reducer';

const app = combineReducers({
  generic,
  sector,
  supplier,
  call,
});

let middleware = {};

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(applyMiddleware(thunk));
} else {
  middleware = applyMiddleware(thunk);
}

export default createStore(app, middleware);
