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
      return state.filter((todo) => todo.completed)

    default:
      return state
  }
}

export const todoActions = {
  initialTodo: (todos) => {
    //FIXME: use async/await
    return {
      type: 'INITIAL_TODO',
      payload: { todos },
    }
  },
  addTodo: (text) => {
    const newTodo = {
      content,
      id: globalThis.crypto.randomUUID(),
      text,
      completed: false,
    }
    return {
      type: 'ADD_TODO',
      payload: { newTodo },
    }
  },
  deleteTodo: (id) => {
    return {
      type: 'DELETE_TODO',
      payload: { id },
    }
  },
  toggleTodo: (id) => {
    return {
      type: 'TOGGLE_TODO',
      payload: { id },
    }
  },
  clearCompleted: () => {
    return {
      type: 'CLEAR_COMPLETE',
    }
  },
}