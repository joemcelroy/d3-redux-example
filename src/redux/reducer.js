import {
  SET_SELECTED_STOCK,
  SET_STOCKS,
  SET_PRICES,
  SET_TIME_FRAME
} from './actions'

import pick from 'lodash/pick'

const initialState = {
  stock: null,
  stocks: [],
  prices: [],
  from: '2015-02-04T08:00:00.000Z',
  to: '2015-02-04T16:30:00.000Z'
}

export const KEY = "global"

export function selectReducer(state) {
  return state[KEY]
}

export function selectSelectedStock(state) {
  return selectReducer(state).stock
}

export function selectStocks(state) {
  return selectReducer(state).stocks
}

export function selectPrices(state) {
  return selectReducer(state).prices
}

export function selectCriteria(state) {
  return pick(selectReducer(state), ['stock', 'from', 'to'])
}

export function selectDateFrom(state) {
  return selectReducer(state).from
}

export function selectDateTo(state) {
  return selectReducer(state).to
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STOCKS:
      return {
        ...state,
        stocks: action.stocks
      }
    case SET_TIME_FRAME:
      return {
        ...state,
        from: action.from,
        to: action.to
      }
    case SET_SELECTED_STOCK:
      return {
        ...state,
        stock: action.stock
      }
    case SET_PRICES:
      return {
        ...state,
        prices: action.prices
      }
    default:
      return state;
  }
}

export default reducer
