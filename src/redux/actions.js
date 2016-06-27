import data from '../../data/data.json'

export const SET_SELECTED_STOCK = "SET_SELECTED_STOCK"
export const SET_STOCKS = "SET_STOCKS"
export const SET_TIME_FRAME = "SET_TIME_FRAME"
export const SET_PRICES = "SET_PRICES"

import {selectCriteria} from './reducer'

import * as _ from 'lodash'

export function selectStock(stock) {
  return (dispatch, getState) => {
    dispatch(setSelectedStock(stock))

    const criteria = selectCriteria(getState())
    const prices = getPricesFromCriteria(data.data, criteria)

    return dispatch(setPrices(prices))
  }
}

export function getPricesFromCriteria(prices, criteria) {
  const segments = 30
  const fromCriteria = (new Date(criteria.from)).getTime()
  const toCriteria = (new Date(criteria.to)).getTime()
  const millisecondDiff = toCriteria - fromCriteria
  const chunk = millisecondDiff / segments

  const priceGroup =  _.chain(prices)
    .filter({ stock: criteria.stock.sym })
    .groupBy((price) => {
      const frag = (((new Date(price.time).getTime()) - fromCriteria) / chunk)
      return Math.round(frag)
    })
    .value()

  if (_.size(priceGroup) == 0) return null

  return _.chain(_.range(segments))
    .map((point) => {
      const milliseconds = (point * chunk) + fromCriteria
      const prices = priceGroup[point] || []

      const stats = (prop) => {
        return {
          min: _.chain(prices).map(prop).min().value(),
          max: _.chain(prices).map(prop).max().value(),
          mean: _.chain(prices).map(prop).mean().value(),
        }
      }

      const priceStats = stats("price")
      const volumeStats = stats("volume")

      return {
        from: new Date(milliseconds),
        to: new Date(milliseconds + chunk),
        prices: prices,
        mean: priceStats.mean,
        max: priceStats.max,
        min: priceStats.min,
        volumeMean: volumeStats.mean,
        volumeMax: volumeStats.max,
        volumeMin: volumeStats.min
      }
    })
    .value()

}

export function changeWindow(from, to) {
  return {
    type: SET_TIME_FRAME,
    from,
    to
  }

}

export function adjustSearch() {
  return (dispatch, getState) => {
    const criteria = selectCriteria(getState())
    const prices = getPricesFromCriteria(data.data, criteria)

    return dispatch(setPrices(prices))
  }
}

export function setPrices(prices) {
  return {
    type: SET_PRICES,
    prices
  }
}

export function setSelectedStock(stock) {
  return {
    type: SET_SELECTED_STOCK,
    stock
  }
}

export function fetchStocks() {
  return {
    type: SET_STOCKS,
    stocks: data.stocks
  }
}
