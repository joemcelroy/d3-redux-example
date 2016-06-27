import {stockPricesToLinePoints, stockPricesToBars} from '../src/components/PriceVolumeGraph'

describe("price volume graph", () => {

  let prices

  beforeEach(() => {
    prices = [
      {
        "from":"2015-02-04T08:00:00.000Z",
        "to":"2015-02-04T08:17:00.000Z",
        "prices":[
          {"stock":"ABC","sym":"ABC.VX","exchange":"XVTX","price":137.21,"change":0,"time":"2015-02-04T08:00:00.000Z","buyAccount":"ACCT1","sellAccount":"ACCT2","volume":1064},
          {"stock":"ABC","sym":"ABC.CHI","exchange":"CHIX","price":137.22,"change":0,"time":"2015-02-04T08:01:50.621Z","buyAccount":"ACCT1","sellAccount":"ACCT8","volume":4304},
          {"stock":"ABC","sym":"ABC.VX","exchange":"XVTX","price":137.23,"change":0.02,"time":"2015-02-04T08:05:44.555Z","buyAccount":"ACCT7","sellAccount":"ACCT4","volume":9519},
          {"stock":"ABC","sym":"ABC.CHI","exchange":"CHIX","price":137.24,"change":0.02,"time":"2015-02-04T08:07:55.276Z","buyAccount":"ACCT3","sellAccount":"ACCT6","volume":6500}
        ],
        "mean":137.225,
        "max":137.24,
        "min":137.21,
        "volumeMean":5346.75,
        "volumeMax":9519,
        "volumeMin":1064
      },
      {
        "from":"2015-02-04T08:17:00.000Z",
        "to":"2015-02-04T08:34:00.000Z",
        "prices":[
          {"stock":"ABC","sym":"ABC.CHI","exchange":"CHIX","price":137.21,"change":-0.03,"time":"2015-02-04T08:09:47.016Z","buyAccount":"ACCT9","sellAccount":"ACCT10","volume":6569},
          {"stock":"ABC","sym":"ABC.VX","exchange":"XVTX","price":137.17,"change":-0.06,"time":"2015-02-04T08:10:14.727Z","buyAccount":"ACCT10","sellAccount":"ACCT9","volume":4055},
          {"stock":"ABC","sym":"ABC.VX","exchange":"XVTX","price":137.18,"change":0.01,"time":"2015-02-04T08:11:24.676Z","buyAccount":"ACCT5","sellAccount":"ACCT6","volume":6692},
          {"stock":"ABC","sym":"ABC.CHI","exchange":"CHIX","price":137.15,"change":-0.06,"time":"2015-02-04T08:11:38.970Z","buyAccount":"ACCT10","sellAccount":"ACCT6","volume":9363},
          {"stock":"ABC","sym":"ABC.CHI","exchange":"CHIX","price":137.14,"change":-0.01,"time":"2015-02-04T08:12:23.751Z","buyAccount":"ACCT10","sellAccount":"ACCT8","volume":5980},
          {"stock":"ABC","sym":"ABC.L","exchange":"LSE","price":137.15,"change":0,"time":"2015-02-04T08:13:02.197Z","buyAccount":"ACCT5","sellAccount":"ACCT4","volume":2322},
          {"stock":"ABC","sym":"ABC.CHI","exchange":"CHIX","price":137.19,"change":0.05,"time":"2015-02-04T08:14:01.668Z","buyAccount":"ACCT5","sellAccount":"ACCT6","volume":5853},
          {"stock":"ABC","sym":"ABC.VX","exchange":"XVTX","price":137.19,"change":0.01,"time":"2015-02-04T08:15:59.072Z","buyAccount":"ACCT6","sellAccount":"ACCT1","volume":5410},
          {"stock":"ABC","sym":"ABC.CHI","exchange":"CHIX","price":137.15,"change":-0.04,"time":"2015-02-04T08:17:00.787Z","buyAccount":"ACCT6","sellAccount":"ACCT5","volume":5721},
          {"stock":"ABC","sym":"ABC.CHI","exchange":"CHIX","price":137.15,"change":0,"time":"2015-02-04T08:18:03.515Z","buyAccount":"ACCT4","sellAccount":"ACCT9","volume":5230},
          {"stock":"ABC","sym":"ABC.L","exchange":"LSE","price":137.12,"change":-0.03,"time":"2015-02-04T08:18:07.199Z","buyAccount":"ACCT2","sellAccount":"ACCT8","volume":8144},
          {"stock":"ABC","sym":"ABC.CHI","exchange":"CHIX","price":137.13,"change":-0.02,"time":"2015-02-04T08:19:25.937Z","buyAccount":"ACCT5","sellAccount":"ACCT10","volume":9840},
          {"stock":"ABC","sym":"ABC.VX","exchange":"XVTX","price":137.14,"change":-0.05,"time":"2015-02-04T08:20:52.620Z","buyAccount":"ACCT4","sellAccount":"ACCT5","volume":5413},
          {"stock":"ABC","sym":"ABC.VX","exchange":"XVTX","price":137.11,"change":-0.03,"time":"2015-02-04T08:22:07.412Z","buyAccount":"ACCT9","sellAccount":"ACCT8","volume":5169},
          {"stock":"ABC","sym":"ABC.VX","exchange":"XVTX","price":137.13,"change":0.02,"time":"2015-02-04T08:22:59.877Z","buyAccount":"ACCT6","sellAccount":"ACCT10","volume":2719},
          {"stock":"ABC","sym":"ABC.VX","exchange":"XVTX","price":137.17,"change":0.04,"time":"2015-02-04T08:24:00.749Z","buyAccount":"ACCT5","sellAccount":"ACCT7","volume":1177}
        ],
        "mean":137.15500000000003,
        "max":137.21,
        "min":137.11,
        "volumeMean":5603.5625,
        "volumeMax":9840,
        "volumeMin":1177
      }
    ]
  })

  it("stockPricesToLinePoints", () => {
    expect(stockPricesToLinePoints(prices)).toEqual({ yMin: 137.15500000000003, yMax: 137.225, xValues: [ '0', '1' ], points: [ Object({ x: 0, y: 137.225 }), { x: 1, y: 137.15500000000003 } ] })
  })

  it("stockPricesToBars", () => {
    expect(stockPricesToBars(prices)).toEqual([
      5346.75,
      5603.5625
    ])
  })
})
