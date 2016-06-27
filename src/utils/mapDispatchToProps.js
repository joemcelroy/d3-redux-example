import { bindActionCreators } from 'redux'
const transform = require('lodash/transform')

export default function MapDispatchToProps(actions) {
  return (dispatch) => {
    let dispatchers =  transform(actions, (result, action, key) => {
      result[key] = bindActionCreators(action, dispatch)
    })
    dispatchers.dispatch = dispatch
    return dispatchers
  }
}
