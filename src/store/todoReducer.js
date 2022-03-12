import { saveTodos, deleteCompleted, toggleTodo, deleteTodo } from '../services/todos'

export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIAL_TODO': {
      const { todos } = action.payload
      return todos
    }
    case 'ADD_TODO':
      const { newTodo } = action.payload
      return [newTodo, ...state]

    case 'TOGGLE_TODO': {
      const { id } = action.payload
      return state.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    }

    case 'DELETE_TODO': {
      const { id } = action.payload
      return state.filter((todo) => todo.id !== id)
    }

    case 'CLEAR_COMPLETE':
      return state.filter((todo) => !todo.completed)

    case 'ORDER_TODOS': {
      const { todos } = action.payload
      if (todos.length !== state.length) {
        throw new Error('Todo length mismatch')
      }
      return todos
    }

    default:
      return state
  }
}

export const todoActions = {
  /**
   *
   * @param {Array} todos The todos from storage
   * @returns {Object: {type: String, payload: Object}} the payload object
   */
  initialTodo: (todos) => {
    return {
      type: 'INITIAL_TODO',
      payload: { todos },
    }
  },

  /**
   *
   * @param {String} text the content of todo
   * @returns Redux-thunk action
   */
  addTodo: (text) => {
    const todo = {
      id: globalThis.crypto.randomUUID(),
      text,
      completed: false,
    }

    return async (dispatch) => {
      await saveTodos({ todo })
      dispatch({
        type: 'ADD_TODO',
        payload: { newTodo: todo },
      })
    }
  },

  /**
   *
   * @param {Number} id the id to delete todo
   * @returns Redux-thunk action
   */
  deleteTodo: (id) => {
    return async (dispatch) => {
      await deleteTodo({ id })
      dispatch({
        type: 'DELETE_TODO',
        payload: { id },
      })
    }
  },

  /**
   *
   * @param {Number} id the id to toggle todo
   * @returns Redux-thunk action
   */
  toggleTodo: (id) => {
    return async (dispatch, getState) => {
      const todo = getState().todos.find((todo) => todo.id === id)
      await toggleTodo({ todo })
      dispatch({
        type: 'TOGGLE_TODO',
        payload: { id },
      })
    }
  },

  /**
   * @description clear all completed todos
   * @returns Redux-thunk action
   */
  clearCompleted: () => {
    return async (dispatch, getState) => {
      const completedTodo = getState().todos.filter((todo) => todo.completed)
      if (completedTodo.length === 0) {
        return
      }
      await deleteCompleted(completedTodo)
      dispatch({
        type: 'CLEAR_COMPLETE',
      })
    }
  },

  /**
   *
   * @param {Object} todos the same todo list but with different order
   * @returns {Object: {type: String, payload: Object}} the payload object
   */
  orderTodos: (todos) => {
    return {
      type: 'ORDER_TODOS',
      payload: { todos },
    }
  },
}
