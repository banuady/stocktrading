import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import stockReducer from './stockReducer';

export default combineReducers({
  form: formReducer,
  stocks: stockReducer,
});
