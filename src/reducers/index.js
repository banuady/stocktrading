import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import stockReducer from './stockReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  stocks: stockReducer,
});
