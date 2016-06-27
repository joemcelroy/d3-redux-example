import * as actions from "../src/redux/actions"
import data from '../data/data.json'
import * as _ from 'lodash'

describe("actions", () => {

  describe("action creators", () => {

    it("set selected stock", () => {
      expect(actions.setSelectedStock(data.stocks[1]))
        .toEqual({ type: 'SET_SELECTED_STOCK', stock: { sym: 'GOG', name: 'Goggle Corp' } })
    })

    it("get stocks", () => {
      expect(actions.fetchStocks())
        .toEqual({ type: 'SET_STOCKS', stocks: data.stocks })
    })

  })

  describe("getPricesFromCriteria", () => {

    it("full day window", () => {
      const from = '2015-02-04T08:00:00.000Z'
      const to = '2015-02-04T16:30:00.000Z'
      const t = actions.getPricesFromCriteria(data.data, { stock: {sym:"ABC"}, from, to })
      const lastTimeSegment = _.last(t)

      expect(t.length).toBe(30)
      expect(lastTimeSegment.to).toEqual(new Date('2015-02-04T16:30:00.000Z'))
      expect(lastTimeSegment.prices.length).toBe(13)
      expect(lastTimeSegment.mean).toBe(136.9946153846154)
      expect(lastTimeSegment.max).toBe(137.04)
      expect(lastTimeSegment.min).toBe(136.94)
    })

    it("partial day window", () => {
      const from = '2015-02-04T08:00:00.000Z'
      const to = '2015-02-04T13:30:00.000Z'
      const t = actions.getPricesFromCriteria(data.data, { stock: {sym:"ABC"}, from, to })
      const lastTimeSegment = _.last(t)

      expect(t.length).toBe(30)
      expect(lastTimeSegment.to).toEqual(new Date('2015-02-04T13:30:00.000Z'))
      expect(lastTimeSegment.mean).toBe(137.0875)
      expect(lastTimeSegment.max).toBe(137.13)
      expect(lastTimeSegment.min).toBe(137.04)
    })

    it("none", () => {
      const from = '2015-02-04T08:00:00.000Z'
      const to = '2015-02-04T13:30:00.000Z'
      const t = actions.getPricesFromCriteria(data.data, { stock: "x", from, to })

      expect(t).toBe(null)
    })

  })

})
