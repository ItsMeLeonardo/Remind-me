import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { todoReducer, todoActions } from './todoReducer'
import { filterReducer, filterActions, FILTER_VALUES } from './filterReducer'

const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
})

export const store = createStore(reducer, composeWithDevTools())
export { todoActions, filterActions, FILTER_VALUES }
