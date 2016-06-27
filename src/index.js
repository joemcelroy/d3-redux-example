import map from 'lodash/map'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import mapDispatchToProps from './utils/mapDispatchToProps'
import {Navigation, View, StockStats, PriceVolumeGraph} from './components'
import {selectStock, fetchStocks, changeWindow, adjustSearch} from './redux/actions'
import {selectSelectedStock, selectStocks, selectPrices, selectDateFrom, selectDateTo} from './redux/reducer'
import { Provider } from 'react-redux'
import configureStore from './store'

const stateToProps = (state) => {
  return {
    selectedStock: selectSelectedStock(state),
    stocks: selectStocks(state),
    prices: selectPrices(state),
    dateFrom: selectDateFrom(state),
    dateTo: selectDateTo(state)
  }
}

@connect(stateToProps, mapDispatchToProps({selectStock, fetchStocks, changeWindow, adjustSearch}))
class App extends React.Component {

  componentWillMount() {
    this.props.fetchStocks()
  }

  render() {
    const graphView = this.props.selectedStock ? <PriceVolumeGraph
      width={1000}
      height={400}
      prices={this.props.prices}
    /> : null

    return (
      <div>
        <Navigation
          dateFrom={this.props.dateFrom}
          dateTo={this.props.dateTo}
          changeWindow={this.props.changeWindow}
          stockOptions={this.props.stocks}
          selectStock={this.props.selectStock}
          adjustSearch={this.props.adjustSearch}
          selectedStockOption={this.props.selectedStock}/>

        {graphView}

      </div>
    )
  }

}

ReactDOM.render(
  <Provider store={configureStore({})}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
