import * as React from 'react'
import map from 'lodash/map'
import * as _ from 'lodash'
const d3 = require('d3')

class Line extends React.Component {

  render() {
    const { path, width, fill, color } = this.props
    return (
      <path d={path} stroke={color} strokeWidth={width} fill={fill} />
    )
  }
}

Line.defaultProps = {
  path: '',
  color: 'red',
  width: 1,
  fill: 'none'
}

class LineDataSeries extends React.Component {

  render() {
    const { data, colors, xScale, yScale, interpolationType } = this.props
    const line = d3.svg.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .interpolate('linear')

    return (
      <Line path={line(this.props.data)} color={'blue'}/>
    )
  }
}

LineDataSeries.defaultProps = {
  data: []
}

class Bar extends React.Component {

  render() {
    return (
      <rect fill={'#ddd'}
        width={this.props.width}
        height={this.props.height}
        x={this.props.offset}
        y={this.props.availableHeight - this.props.height}
      />
    )
  }
}

class BarDataSeries extends React.Component {
  render() {
    const { height, data, width, color } = this.props

    const yScale = d3.scale.linear()
          .domain([0, d3.max(data)])
          .range([0, height]);

    const xScale = d3.scale.ordinal()
      .domain(d3.range(data.length))
      .rangeRoundBands([0, width], 0);

    const bars = _.map(data, function(point, i) {
      return (
        <Bar
          height={yScale(point)}
          width={xScale.rangeBand()}
          offset={xScale(i)}
          availableHeight={height}
          color={color}
          key={i} />
      )
    });

    return (
      <g>{bars}</g>
    );
  }
}

export function stockPricesToLinePoints(prices) {

  // chunk into time segments
  const points = _.chain(prices)
    .map((price, x) => {
      return {x:x, y: price.mean || 0}
    })
    .value()

  const max = _.chain(prices).map('mean').max().value()
  const min = _.chain(prices).map('mean').min().value()
  const xValues = _.keys(prices)

  return {
    yMin: min,
    yMax: max,
    xValues,
    points: points || []
  }

}

export function stockPricesToBars(prices) {
  return _.chain(prices)
          .map('volumeMean')
          .value()
}

export default class PriceVolumeGraph extends React.Component {

  render() {

    const {width, height, prices} = this.props
    const data = stockPricesToLinePoints(prices)
    const volumeBars = stockPricesToBars(prices)

    if (prices.length == 0) return null

    const xScale = d3.scale.ordinal()
                    .domain(data.xValues)
                    .rangePoints([0, width])

    const yScale = d3.scale.linear()
                    .domain([data.yMin, data.yMax])
                    .range([height, 50, 0.05])

    return (
      <svg width={this.props.width} height={this.props.height}>
        <LineDataSeries
          xScale={xScale}
          yScale={yScale}
          data={data.points}
          width={width}
          height={height}
        />
        <BarDataSeries data={volumeBars} width={this.props.width} height={50} />
      </svg>
    )
  }

}
