import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import home from './Home/reducer';
import sector from './Sector/reducer';
import supplier from './Supplier/reducer';

const app = combineReducers({
  home,
  sector,
  supplier,
});

let middleware = {};

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(applyMiddleware(thunk));
} else {
  middleware = applyMiddleware(thunk);
}

export default createStore(app, middleware);
