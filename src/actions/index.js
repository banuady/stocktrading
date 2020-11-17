import stocks from '../apis/stocks';
import history from '../history';
import { CREATE_STOCK, SELL_STOCK, FETCH_ALL_STOCKS, FETCH_STOCK, DELETE_STOCK } from './types';

export const createStock = (formValues) => async (dispatch) => {
  // const response = await stocks.post('/stocks', { ...formValues, status: 'active' });
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
  });

  dispatch({
    type: CREATE_STOCK,
    payload: response.data,
  });

  history.push('/');
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

  history.push('/');
};

export const fetchAllStocks = () => async (dispatch) => {
  const response = await stocks.get('/stocks');

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

export const deleteStock = (id) => async (dispatch) => {
  await stocks.delete(`/stocks/${id}`);

  dispatch({
    type: DELETE_STOCK,
    payload: id,
  });

  history.push('/');
};
