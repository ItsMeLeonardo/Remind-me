import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { todoReducer, todoActions } from './todoReducer'

export const store = createStore(todoReducer, composeWithDevTools())
export { todoActions }
