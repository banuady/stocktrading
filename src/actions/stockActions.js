import stocks from '../apis/stocks';
import history from '../history';
import {
  CREATE_STOCK,
  SELL_STOCK,
  FETCH_ALL_STOCKS,
  FETCH_STOCK,
  EDIT_STOCK,
  DELETE_STOCK,
  ADD_DIVIDENTS,
} from './stockTypes';

export const createStock = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await stocks.post('/stocks', {
    symbol: formValues.symbol,
    name: formValues.name,
    purchased: {
      date: formValues.date,
      unitPrice: formValues.unitPrice,
      quantity: formValues.quantity,
      fees: formValues.fees,
    },
    status: 'active',
    userId,
  });

  dispatch({
    type: CREATE_STOCK,
    payload: response.data,
  });

  history.push('/stocks');
};

export const sellStock = (id, formValues) => async (dispatch) => {
  const response = await stocks.patch(`/stocks/${id}`, {
    sold: {
      date: formValues.date,
      unitPrice: formValues.unitPrice,
      quantity: formValues.quantity,
      fees: formValues.fees,
    },
    status: 'closed',
  });

  dispatch({
    type: SELL_STOCK,
    payload: response.data,
  });

  history.push('/stocks');
};

export const fetchAllStocks = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await stocks.get(`/stocks?userId=${userId}`);

  dispatch({
    type: FETCH_ALL_STOCKS,
    payload: response.data,
  });
};

export const fetchStock = (id) => async (dispatch) => {
  const response = await stocks.get(`/stocks/${id}`);

  dispatch({
    type: FETCH_STOCK,
    payload: response.data,
  });
};

export const editStock = (id, formValues, status) => async (dispatch) => {
  const response = await stocks.patch(`/stocks/${id}`, {
    symbol: formValues.symbol,
    name: formValues.name,
    [status]: {
      date: formValues.date,
      unitPrice: formValues.unitPrice,
      quantity: formValues.quantity,
      fees: formValues.fees,
    },
  });

  dispatch({
    type: EDIT_STOCK,
    payload: response.data,
  });

  history.push('/stocks');
};

export const deleteStock = (id) => async (dispatch) => {
  await stocks.delete(`/stocks/${id}`);

  dispatch({
    type: DELETE_STOCK,
    payload: id,
  });

  history.push('/stocks');
};

export const addDividents = (id, formValues) => async (dispatch) => {
  const response = await stocks.patch(`/stocks/${id}`, {
    dividents: {
      date: formValues.date,
      unitPrice: formValues.unitPrice,
      quantity: formValues.quantity,
      fees: formValues.fees,
    },
  });

  dispatch({
    type: ADD_DIVIDENTS,
    payload: response.data,
  });

  history.push('/stocks');
};
