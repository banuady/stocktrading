import _ from 'lodash';
import {
  CREATE_STOCK,
  SELL_STOCK,
  FETCH_ALL_STOCKS,
  FETCH_STOCK,
  EDIT_STOCK,
  DELETE_STOCK,
  ADD_DIVIDENTS,
} from '../actions/stockTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_STOCKS:
      // return { ...state, ..._.mapKeys(action.payload, 'id') };
      return { ..._.mapKeys(action.payload, 'id') };
    case FETCH_STOCK:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STOCK:
      return { ...state, [action.payload.id]: action.payload };
    case SELL_STOCK:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STOCK:
      return { ...state, [action.payload.id]: action.payload };
    case ADD_DIVIDENTS:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STOCK:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
