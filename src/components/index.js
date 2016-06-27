import * as React from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import isDate from 'lodash/isDate'

import PriceVolumeGraph from './PriceVolumeGraph'

const Select = (props) => {

  const onSelect = (e) => {
    const selectedOption = props.options[parseInt(e.target.value)]
    props.onSelect(selectedOption)
  }

  const selectedIndex = props.options.indexOf(props.selected)

  return (
    <select onChange={onSelect} value={selectedIndex}>
      <option value={-1}>Choose stock</option>
      {map(props.options, (option, i) => {
        const label = option.name || option
        return (
          <option key={i} value={i}>{label}</option>
        )
      })}
    </select>
  )
}

const Navigation = (props) => {

  const onChange = (section, e) => {
    const dates = {
      from: props.dateFrom,
      to: props.dateTo
    }
    dates[section] = e.target.value
    props.changeWindow(dates.from, dates.to)
  }

  const submit = (e) => {
    e.preventDefault()
    props.adjustSearch()
  }

  const dateRangeSelect = props.selectedStockOption ? <form onSubmit={submit}>
    <input type="text" value={props.dateFrom} onChange={onChange.bind(this, 'from')}/>
    <input type="text" value={props.dateTo} onChange={onChange.bind(this, 'to')}/>

    <input type="submit"/>
  </form> : null


  return (
    <div className="navigation">
      <Select
        options={props.stockOptions}
        onSelect={props.selectStock}
        selected={props.selectedStockOption} />

      {dateRangeSelect}
    </div>
  )
}

const StockStats = (props) => {
  return (
    <div>Stock stats</div>
  )
}

export {
  Select,
  Navigation,
  StockStats,
  PriceVolumeGraph
}
