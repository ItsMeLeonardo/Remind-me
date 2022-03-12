import { createContext, useState, useEffect } from 'react'

export const TodoContext = createContext([])

const FILTER_VALUES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

export function TodoProvider({ initialTodos = [], children } = {}) {
  const [todos, setTodos] = useState(initialTodos)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (todos.length !== 0) return
    if (initialTodos.length === 0) return

    setTodos(initialTodos)
  }, [initialTodos])

  const value = {
    todos,
    setTodos,
    filter,
    setFilter,
    FILTER_VALUES,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
