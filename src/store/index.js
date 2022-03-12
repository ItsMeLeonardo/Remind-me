import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { todoReducer, todoActions } from './todoReducer'
import { filterReducer, filterActions, FILTER_VALUES } from './filterReducer'

const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export { todoActions, filterActions, FILTER_VALUES }
