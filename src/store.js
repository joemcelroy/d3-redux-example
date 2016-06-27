import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux'
import createLogger from "redux-logger"
import globalReducer, {KEY} from './redux/reducer'
import ReduxThunk from 'redux-thunk'

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const devtools = window.devToolsExtension || (() => noop => noop)

export default function createReducer() {
  return combineReducers({
    [KEY]: globalReducer
  })
}

export default function configureStore(initialState = {}) {

  const middlewares = [
    ReduxThunk,
    logger
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools()
  ]

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  )

  return store
}
